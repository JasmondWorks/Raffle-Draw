"use client";

import DeleteEventDialogContent from "@/components/DeleteEventDialogContent";
import { EditEventDialogContent } from "@/components/EditEventDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Event } from "@/lib/types";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaExternalLinkAlt, FaTrash } from "react-icons/fa";

export default function EventItem({ event }: { event: Event }) {
  const [open, setOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>();

  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(4, 250px) auto",
        alignItems: "center",
      }}
      className="border-b hover:bg-neutral-50 transition-colors border-neutral-200 py-2 w-fit text-sm"
    >
      <span>{event.title}</span>
      <span>{event.organisationName}</span>
      <span>{event.numOfParticipants}</span>
      {event.logoImage ? (
        <div className="text-left">
          <Image
            src={event.logoImage}
            width={100}
            height={100}
            alt="logo"
            className="h-10 flex w-fit text-left object-contain"
          />
        </div>
      ) : (
        <span>N/A</span>
      )}
      <div className="flex gap-3">
        <Link href={`/user/events/${event._id}/spin`}>
          <button className="hover:bg-neutral-200 text-neutral-500 !hover:text-white p-2 h-full aspect-square grid place-items-center">
            <FaExternalLinkAlt className="" />
          </button>
        </Link>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="hover:bg-neutral-200 text-indigo-500 !hover:text-white p-2 h-full aspect-square grid place-items-center">
              <Edit size={18} className="" />
            </button>
          </DialogTrigger>
          <EditEventDialogContent setIsOpen={setOpen} event={event} />
        </Dialog>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild>
            <button className="hover:bg-neutral-200 text-red-500 !hover:text-white p-2 h-full aspect-square grid place-items-center">
              <FaTrash size={18} />
            </button>
          </DialogTrigger>
          <DeleteEventDialogContent
            setIsOpen={setDeleteDialogOpen}
            event={event}
          />
        </Dialog>
      </div>
    </div>
  );
}
