"use client";

import { clearResults } from "@/actions";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Results } from "@/lib/types";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ResultsDialog({
  results,
  eventId,
}: {
  results: Results;
  eventId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDialogContent, setSelectedDialogContent] = useState("");

  function handleOpenResultsDialog() {
    setIsOpen(true);
    setSelectedDialogContent("results");
  }
  function handleOpenClearResultsDialog() {
    setIsOpen(true);
    setSelectedDialogContent("clear");
  }

  // Function to handle setting the eventId in the URL when the dialog is triggered

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="font-bold text-indigo-600 text-sm">
          <div onClick={handleOpenResultsDialog}>
            Results
            <span> ({results.totalResults})</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        {selectedDialogContent === "results" && (
          <ResultsDialogContent
            onOpenClearResultsDialog={handleOpenClearResultsDialog}
            results={results}
            eventId={eventId}
          />
        )}
        {selectedDialogContent === "clear" && (
          <ClearResultsDialogContent eventId={eventId} setIsOpen={setIsOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ClearResultsDialogContent({
  eventId,
  setIsOpen,
}: {
  eventId: string;
  setIsOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteResults() {
    try {
      setIsLoading(true);
      await clearResults(eventId);

      toast.success("Results have been cleared successfully");
      setIsOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
    </>
  );
}

function ResultsDialogContent({
  results,
  eventId,
  onOpenClearResultsDialog,
}: {
  results: Results;
  eventId: string;
  onOpenClearResultsDialog: () => void;
}) {
  const page = results.page + "";

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-left">Results</DialogTitle>
      </DialogHeader>

      <DialogDescription></DialogDescription>
      {results.data.length ? (
        <>
          <div className="overflow-auto">
            <div
              style={{
                display: "grid",
                gap: "2rem",
                minWidth: "100%",
              }}
              className="grid-cols-[repeat(2,_150px)] md:grid-cols-[repeat(2,_200px)] lg:grid-cols-[repeat(2,_220px)] py-3 text-neutral-500 font-bold border-b border-neutral-200 w-fit"
            >
              <span>Index</span>
              <span>Ticket number</span>
            </div>
            {/* Render results here as needed */}
            {results.data.map((result, index) => (
              <div
                key={result._id}
                style={{
                  display: "grid",
                  gap: "2rem",
                  minWidth: "100%",
                }}
                className="grid-cols-[repeat(2,_150px)] md:grid-cols-[repeat(2,_200px)] lg:grid-cols-[repeat(2,_220px)] py-3 text-neutral-500 font-bold border-b border-neutral-200 w-fit"
              >
                <span>{index + 1}</span>
                <span>{result.ticketNumber}</span>
              </div>
            ))}
            {/* Additional result items */}
          </div>
          <div className="flex items-center justify-between">
            <Pagination
              className="!pt-0"
              page={page}
              pagesCount={results.totalPages}
              url={`/user/events/${eventId}/spin`}
            />
            <button
              onClick={onOpenClearResultsDialog}
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 p-1.5 px-5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Clear results
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-center">You currently have no results</h1>
      )}
    </>
  );
}
