"use client";

import { useEffect, useState } from "react";
import BlogCard, { Post } from "@/components/BlogCard";
import { Chip } from "@nextui-org/react";
import { SearchedPosts } from "../search/searchedPosts";
import { CloseIcon } from "@/components/icons";

function SelectChip({
  title,
  posts,
  onSelect,
}: {
  title: string;
  posts: Post[];
  onSelect: (tag: string, isActive: boolean) => void;
}) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const newActiveState = !active;
    setActive(newActiveState);
    onSelect(title, newActiveState);
  };

  return (
    <Chip
      variant={active ? "faded" : "bordered"}
      color="primary"
      className="cursor-pointer select-none"
      onClick={handleClick}
    >
      {title}
    </Chip>
  );
}

export function Tags({
  posts,
  isSearch = false,
}: {
  posts: Post[];
  isSearch: boolean;
}) {
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  const addTag = (tag: string) => {
    setTags((prevTags) => new Set(prevTags).add(tag));
  };

  const handleTagSelect = (tag: string, isActive: boolean) => {
    setSelectedTags((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (isActive) {
        newSelected.add(tag);
      } else {
        newSelected.delete(tag);
      }
      return newSelected;
    });
  };

  useEffect(() => {
    posts.forEach((post) => {
      Array.isArray(post.tags)
        ? post.tags
        : JSON.parse(post.tags).forEach((tag: string) => {
            addTag(tag);
          });
    });
  }, [posts]);

  useEffect(() => {
    if (selectedTags.size === 0) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) => {
          const postTags = Array.isArray(post.tags)
            ? post.tags
            : JSON.parse(post.tags);
          return Array.from(selectedTags).some((tag: string) =>
            postTags.includes(tag)
          );
        })
      );
    }
  }, [selectedTags, posts]);

  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        {Array.from(tags).map((tag: string, index: number) => (
          <SelectChip
            title={tag}
            posts={posts}
            key={index}
            onSelect={handleTagSelect}
          />
        ))}
      </div>
      {!isSearch && (
        <div className="flex gap-3 flex-wrap pt-4">
          {filteredPosts.length === 0 ? (
            <div className="flex gap-1">
              <CloseIcon color="#A1AECE" width={19} />
              <span className="text-foreground-500">No Posts found</span>
            </div>
          ) : (
            filteredPosts.map((post: Post, index: number) => (
              <BlogCard post={post} key={index} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
