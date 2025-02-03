"use client";

import MultiChipSelect from "@/components/shadcn/fancy-multi-select";
import { useToast } from "@/components/shadcn/use-toast";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

import {
  Button,
  DatePicker,
  DateValue,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Editable, useEditor } from "@wysimark/react";
import * as React from "react";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import DefaultLayout from "@/layouts/DefaultLayout";

type ChipType = {
  label: string;
};

const password = process.env.NEXT_PUBLIC_PASSWORD;

export default function AddPost() {
  const [postID, setPostID] = useState("");
  const [title, setTitle] = useState("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [passwordCorrect, setPasswordCorrect] = useState<boolean>(false);
  const [excerpt, setExcerpt] = useState("");
  const [postDate, setPostDate] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const [estimatedTime, setEstimatedTime] = useState<string>();
  const [markdown, setMarkdown] = useState("This is the body");
  const [selectedTags, setSelectedTags] = useState<ChipType[]>([]);
  const [imageUrl, setImageUrl] = useState(
    "https://github.com/aryanranderiya.png"
  );

  const { toast } = useToast();
  const editor = useEditor({});
  let formatter = useDateFormatter({
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordCorrect(userPassword === password);
  };

  const calculateEstimatedTime = React.useCallback(
    debounce((text: string) => {
      const wordCount = text
        .replace(/[^\w\s]|nbsp+/g, "")
        .split(/\s+|\n+/).length;

      setEstimatedTime(
        `${(wordCount / 238).toFixed(wordCount / 238 <= 1 ? 2 : 1)} Minutes`
      );
    }, 300),
    []
  );

  useEffect(() => {
    calculateEstimatedTime(markdown);
    return () => {
      calculateEstimatedTime.cancel();
    };
  }, [markdown, calculateEstimatedTime]);

  useEffect(() => {
    setPostID(title.replace(/\s+/g, "_").replace(/[^\w]/g, "").slice(0, 35));
  }, [title]);

  const handleSubmit = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postID,
          title,
          date: !!postDate
            ? formatter.format(postDate.toDate(getLocalTimeZone())).toString()
            : null,
          excerpt,
          tags: selectedTags.map((tag) => tag.label),
          content: markdown,
          estimated_read_time: estimatedTime,
          image: imageUrl,
        }),
      }
    );

    if (!response.ok) {
      const result = await response.json();

      toast({
        title: "Failed to add Post." + result?.error,
      });
    } else
      toast({
        title: "Post successfully added.",
      });
    setPostID("");
    setTitle("");
    setExcerpt("");
    setPostDate(today(getLocalTimeZone()));
    setEstimatedTime("");
    setMarkdown("This is the body");
    setSelectedTags([]);
  };

  return (
    <>
      {passwordCorrect ? (
        <div className="flex min-h-[90vh] h-fit flex-col w-full sm:gap-7 sm:pr-24 sm:pt-[50px] sm:pb-[300px] p-[2em] gap-5 min-w-[65vw]">
          <span className="text-nowrap font-semibold text-4xl">Add Post</span>

          <div className="flex gap-3">
            <Input
              placeholder="thisisapost"
              label="Enter Post ID"
              description={`Max Characters: 35 | ${postID.length}`}
              variant="faded"
              value={postID}
              onValueChange={(e) => {
                setPostID(
                  e.replace(/\s+/g, "_").replace(/[^\w]/g, "").slice(0, 35)
                );
              }}
            />

            <Input
              placeholder="Lorem ipsum"
              label="Enter Post Title"
              variant="faded"
              value={title}
              onValueChange={(e) => setTitle(e)}
            />
          </div>

          <Textarea
            placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing."
            label="Enter Post Excerpt"
            variant="faded"
            description={`Max Words: 200 | Current: ${
              excerpt
                .trim()
                .replace(/[^\w\s]|nbsp+/g, "")
                .split(/\s+|\n+/).length
            } words`}
            value={excerpt}
            onValueChange={(string) => {
              const wordCount = string
                .replace(/[^\w\s]|nbsp+/g, "")
                .split(/\s+|\n+/).length;

              if (wordCount <= 200) setExcerpt(string);
            }}
          />
          <div className="flex gap-3">
            <DatePicker
              label="Post Date"
              variant="faded"
              value={postDate}
              maxValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              showMonthAndYearPickers
              onChange={(e) => setPostDate(e)}
            />

            <Input
              placeholder="10 Minutes"
              label="Estimated Read Time"
              variant="faded"
              value={estimatedTime}
              onValueChange={(e) => setEstimatedTime(e)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Input
              type="url"
              onValueChange={setImageUrl}
              value={imageUrl}
              variant="faded"
              placeholder="https://github.com/aryanranderiya.png"
              isClearable
              label="Enter URL for Post Banner image"
            />

            <MultiChipSelect
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>

          {/* // tags={tags}
        // 
        /> */}

          <div className="rounded-2xl overflow-hidden outline outline-3 outline-foreground-200">
            <Editable
              editor={editor}
              value={markdown}
              onChange={setMarkdown}
              className="min-h-[40vh] max-h-[1000px] overflow-scroll border-none"
            />
          </div>

          <Button
            variant="shadow"
            color="primary"
            className="font-semibold min-w-fit"
            onClick={handleSubmit}
          >
            Create new post
          </Button>
        </div>
      ) : (
        <form
          className="flex h-screen w-full flex-1 mt-[-10%] flex-col items-center gap-2 justify-center min-w-[60vw]"
          onSubmit={handleSubmitPassword}
        >
          <span className="font-semibold text-lg">Enter Password:</span>
          <Input
            placeholder="Enter Password"
            variant="faded"
            type="password"
            onValueChange={setUserPassword}
            value={userPassword}
            className="max-w-sm"
          />
          <Button
            type="submit"
            color="primary"
            className="font-semibold"
            variant="flat"
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
}
