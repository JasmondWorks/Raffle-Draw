"use client";

import { createEvent } from "@/actions";
import { supabase } from "@/app/supabaseClient";
import ImageInput from "@/components/ImageInput";
import Spinner from "@/components/Spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CreateEventDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          New event
        </button>
      </DialogTrigger>
      <CreateEventDialogContent setIsOpen={setIsOpen} />
    </Dialog>
  );
}

function CreateEventDialogContent({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [numOfParticipants, setNumOfParticipants] = useState("");
  const [organisationName, setOrganisationName] = useState("");

  const [image, setImage] = useState<File | null>();
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_imageUrl, setImageUrl] = useState("");

  console.log(_imageUrl);

  const handleImageUpload = async () => {
    if (!image) return;

    try {
      setUploading(true);

      // Upload the image to Supabase Storage
      const { data, error } = await supabase.storage
        .from("logos")
        .upload(`images/${Date.now()}_${image.name}`, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Generate Public URL
      const { data: publicUrlData } = supabase.storage
        .from("logos")
        .getPublicUrl(data.path);

      setImageUrl(publicUrlData?.publicUrl);
      return publicUrlData?.publicUrl; // Return the image URL
    } catch (error: unknown) {
      toast.dismiss();

      // Check if the error is an instance of Error to access its message
      if (error instanceof Error) {
        toast.error(`Failed to upload image: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log("here");
    e.preventDefault();

    // If there's no image, show error
    // if (!image) {
    //   toast.error("Please upload a logo.");
    //   return;
    // }

    setIsLoading(true);

    try {
      // First, upload the image and get the public URL
      const uploadedImageUrl = await handleImageUpload();
      //   if (!uploadedImageUrl) return;

      // Now, create the event with the image URL
      const eventDetails = {
        title,
        numOfParticipants,
        organisationName,
        logoImage: uploadedImageUrl,
      };

      await createEvent(eventDetails);

      toast.success("Your event has successfully been created.");
      setIsOpen(false);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while creating the event."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader className="space-y-10">
        <DialogTitle asChild>
          <h2 className="text-2xl/9 font-bold tracking-tight text-gray-900 text-left">
            Event details
          </h2>
        </DialogTitle>
        <DialogDescription asChild className="text-left">
          <div className="sm:w-full">
            <form onSubmit={handleSubmit} className="space-y-6" action="#">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    value={title}
                    placeholder="e.g ASBON women fellowship"
                    type="text"
                    name="title"
                    id="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="numOfParticipants"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Number of participants
                </label>
                <div className="mt-2">
                  <input
                    value={numOfParticipants}
                    type="number"
                    min={1}
                    name="numOfParticipants"
                    id="numOfParticipants"
                    required
                    onChange={(e) =>
                      setNumOfParticipants(Number(e.target.value))
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="organisationName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Organisation name
                </label>
                <div className="mt-2">
                  <input
                    value={organisationName}
                    type="text"
                    min={1}
                    name="organisationName"
                    id="organisationName"
                    required
                    onChange={(e) => setOrganisationName(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <ImageInput
                    image={image}
                    label="Upload a logo"
                    setImage={setImage}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading || uploading ? (
                    <Spinner className="!border-white" />
                  ) : (
                    "Add new"
                  )}
                </button>
              </div>
            </form>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
