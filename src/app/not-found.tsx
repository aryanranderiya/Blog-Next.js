"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="w-[70vw] flex-col flex justify-center h-[90vh] items-center">
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <span className="font-bold text-2xl">404</span>
          <span>Page Not Found</span>
        </div>
        <Button
          className="w-full"
          variant="flat"
          color="primary"
          size="sm"
          onPress={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
