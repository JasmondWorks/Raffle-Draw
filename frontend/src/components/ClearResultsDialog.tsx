import { clearResults } from "@/actions";
import Spinner from "@/components/Spinner";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ClearResultsDialog({ setIsOpen, event }) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDeleteResults() {
    try {
      setIsLoading(true);
      const res = await clearResults(event._id);
      if (res.status === "success") {
        toast.success("Results have been cleared successfully");
        setIsOpen(false);
      } else {
        toast.error(res.data as string);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>This will clear all your results</DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex mt-5 gap-2">
        <button
          onClick={handleDeleteResults}
          className="p-2 bg-red-600 text-white rounded-lg flex-1"
        >
          {isLoading ? <Spinner className="!border-white" /> : "Yes"}
        </button>
        <DialogClose asChild>
          <button className="p-2 border border-neutral-300 rounded-lg flex-1">
            No
          </button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
