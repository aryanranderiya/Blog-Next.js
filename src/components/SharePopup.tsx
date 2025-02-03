"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { ClipboardDoneIcon, ClipboardIcon } from "./icons";

export default function SharePopup({
  onClose,
  isOpen,
  postID,
}: {
  isOpen: boolean;
  onClose: () => void;
  postID: string;
}) {
  const [shareClipboardWrite, setShareClipboardWrite] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Share Post
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center flex-wrap items-center gap-2">
                <div
                  className="min-w-[50px] min-h-[50px] rounded-full bg-[#00bbff] cursor-pointer flex items-center justify-center"
                  onClick={() => {
                    setShareClipboardWrite(true);
                    navigator.clipboard.writeText(
                      `https://blog.aryanranderiya.com/${postID}`
                    );

                    setTimeout(() => {
                      setShareClipboardWrite(false);
                    }, 2000);
                  }}
                >
                  {shareClipboardWrite ? (
                    <ClipboardDoneIcon width={30} height={30} color="white" />
                  ) : (
                    <ClipboardIcon width={30} height={30} color="white" />
                  )}
                </div>

                <EmailShareButton
                  url={`https://blog.aryanranderiya.com/${postID}`}
                >
                  <EmailIcon round size={50} />
                </EmailShareButton>

                <WhatsappShareButton
                  url={`https://blog.aryanranderiya.com/${postID}`}
                >
                  <WhatsappIcon round size={50} />
                </WhatsappShareButton>

                <TwitterShareButton
                  url={`https://blog.aryanranderiya.com/${postID}`}
                >
                  <TwitterIcon round size={50} />
                </TwitterShareButton>

                <RedditShareButton
                  url={`https://blog.aryanranderiya.com/${postID}`}
                >
                  <RedditIcon round size={50} />
                </RedditShareButton>

                <FacebookShareButton
                  url={`https://blog.aryanranderiya.com/${postID}`}
                >
                  <FacebookIcon round size={50} />
                </FacebookShareButton>

                <LinkedinShareButton
                  url={`https://blog.aryanranderiya.com/${postID}`}
                >
                  <LinkedinIcon round size={50} />
                </LinkedinShareButton>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
