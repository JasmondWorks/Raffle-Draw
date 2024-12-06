"use client";

import Confetti from "react-confetti";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { addResult } from "@/actions";
import toast from "react-hot-toast";
import { Event, Result } from "@/lib/types";

export default function SpinnerArea({
  event,
  allResults,
}: {
  event: Event;
  allResults: Result[];
}) {
  const logoImage = event.logoImage;
  const [numbers, setNumbers] = useState(
    Array.from({ length: event.numOfParticipants }, (_, i) => i + 1)
  );

  console.log(allResults);
  console.log(numbers);

  useEffect(() => {
    setNumbers(
      Array.from({ length: event.numOfParticipants }, (_, i) => i + 1)
    );

    const removeSet = new Set(
      allResults.map((result: Result) => result.ticketNumber)
    );

    const updatedArray = numbers.filter((item) => !removeSet.has(item));

    setNumbers(updatedArray);
  }, [allResults, allResults.length, event.numOfParticipants]);

  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const [finalNumber, setFinalNumber] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const drumRollRef = useRef<HTMLAudioElement>(null);
  const crashRef = useRef<HTMLAudioElement>(null);
  const drumRoll = "/drum-roll-sound-effect.mp3";
  const crashSound = "/crash.mp3";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  // Ensure audio is preloaded and ready to play
  useEffect(() => {
    if (drumRollRef.current) {
      drumRollRef.current.load();
    }
    if (crashRef.current) {
      crashRef.current.load();
    }
  }, []);

  async function startSpinning() {
    if (numbers.length === 1)
      return toast.error("You have used up all your spins");

    setIsSpinning(true);
    setShowConfetti(false);
    setFinalNumber(null);

    // Ensure the audio is ready to play and start drum roll sound
    if (drumRollRef.current && drumRollRef.current.paused) {
      drumRollRef.current.play();
    }

    let spinIndex = 0;
    const spinDuration = 3500; // Duration in milliseconds for the entire spin
    const spinInterval = 150; // Fixed interval between number changes (milliseconds)

    const spinner = setInterval(() => {
      const randomNum = Math.floor(Math.random() * numbers.length);
      setCurrentNumber(numbers[randomNum]);
      spinIndex = (spinIndex + 1) % numbers.length;
    }, spinInterval);

    // Stop the spin and select a final number after the spin duration
    setTimeout(async () => {
      clearInterval(spinner);

      // Randomly pick a final number
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const selectedNumber = numbers[randomIndex];
      setFinalNumber(selectedNumber);
      setCurrentNumber(selectedNumber);

      // Save result to the database
      const res = await addResult(event._id, selectedNumber);
      if (res.status === "success") {
        // toast.success("Your result has successfully been saved.");
      } else {
        toast.error(res.data as string);
      }
      setIsSpinning(false);

      // Stop drum roll and play crash sound
      if (drumRollRef.current) {
        drumRollRef.current.pause();
        drumRollRef.current.currentTime = 0;
      }
      if (crashRef.current) {
        crashRef.current.play();
      }

      // Show confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, spinDuration); // Spin for the set duration
  }

  function resetSpinner() {
    setCurrentNumber(null);
    setFinalNumber(null);
    setShowConfetti(false);
  }

  return (
    <>
      {showConfetti && (
        <Confetti width={dimensions.width} height={dimensions.height} />
      )}

      {/* Audio Elements for Drum Roll and Crash */}
      <audio ref={drumRollRef} src={drumRoll} preload="auto" />
      <audio ref={crashRef} src={crashSound} preload="auto" />

      <div className="text-center  grid place-items-center">
        <h1
          className="text-[5rem] h-52 items-center font-bold text-neutral-600 flex justify-center"
          aria-live="polite"
        >
          {finalNumber !== null ? (
            finalNumber // Show final number after spin stops
          ) : isSpinning ? (
            currentNumber // Show current number during spin
          ) : logoImage ? (
            <Image
              className="w-52 aspect-auto object-contain"
              src={logoImage}
              width={500}
              height={500}
              alt="logo"
            />
          ) : (
            "Ready?" // Default text before spin
          )}
        </h1>
      </div>
      <div className="flex gap-3 justify-center mt-8">
        <button
          onClick={startSpinning}
          disabled={isSpinning}
          className={`px-6 py-2 text-white font-semibold rounded-md shadow-sm ${
            isSpinning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isSpinning ? "Spinning..." : "Spin Now"}
        </button>
        <button
          onClick={resetSpinner}
          disabled={isSpinning}
          className="px-6 py-2 text-indigo-600 font-semibold rounded-md shadow-sm border border-indigo-600 hover:bg-neutral-100"
        >
          Reset
        </button>
      </div>
    </>
  );
}
