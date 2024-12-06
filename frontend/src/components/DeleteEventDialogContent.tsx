import { deleteEvent } from "@/actions";
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

export default function DeleteEventDialogContent({ setIsOpen, event }) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDeleteEvent() {
    setIsLoading(true);

    const res = await deleteEvent(event._id);
    if (res.status === "success") {
      toast.success("Your event has successfully been deleted.");
      setIsOpen(false);
    } else {
      toast.error(res.data as string);
    }
    setIsLoading(false);
  }
  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This will delete your event and all its data
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex mt-5 gap-2">
        <button
          onClick={handleDeleteEvent}
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
