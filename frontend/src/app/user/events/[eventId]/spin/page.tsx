/* eslint-disable */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */

import { getAllResults, getEvent, getResults } from "@/actions";
import ResultsDialog from "@/components/ResultsDialog";
import SpinnerArea from "@/components/SpinnerArea";

const SpinPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const { eventId } = params; // Extracting eventId from params
  const { page } = searchParams; // Extracting page from searchParams

  console.log(params, searchParams);

  const event = await getEvent(eventId);
  const results = await getResults(eventId, page);
  const allResults = await getAllResults(eventId);

  return (
    <div className="pt-10 min-h-screen flex flex-col">
      <div className="container flex-1 flex flex-col place-items-center">
        <div className="flex items-center w-full gap-10 justify-between">
          <div className="text-center text-sm font-semibold space-x-5 text-neutral-600 py-8">
            <span>Participants: {event.numOfParticipants}</span>
          </div>
          <ResultsDialog results={results} eventId={eventId} />
        </div>
        <div className="grid place-items-center flex-1">
          <div className="space-y-14">
            <h1 className="text-3xl font-bold text-center">{event.title}</h1>
            <SpinnerArea event={event} allResults={allResults} />
          </div>
        </div>
      </div>

      <footer className="px-5 bg-neutral-200">
        <div className="text-sm py-3 text-center font-bold text-neutral-600">
          <span className="text-indigo-600">{event.organisationName}</span>{" "}
          {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default SpinPage;
