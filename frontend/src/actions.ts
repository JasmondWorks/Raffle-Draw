"use server";

// import { getUserToken } from "@/server-utils";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

export async function getUserToken() {
  const tokenCookie = await cookies(); // No `await` needed
  const cookie = tokenCookie.get("token");
  return cookie ? cookie.value : null; // Safely handle potential null
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const signIn = async (userDetails: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${apiUrl}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  const { user, token } = data;

  return { user, token };
};
export const signUp = async (userDetails: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${apiUrl}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  const { user, token } = data;

  return { user, token };
};
export const authenticate = async () => {
  const storedToken = await getUserToken();

  const res = await fetch(`${apiUrl}/users/authenticate`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  console.log(data);

  return data;
};

export const createEvent = async (eventDetails: {
  title: string;
  numOfParticipants: number;
  organisationName: string;
  logoImage: string;
}) => {
  const storedToken = await getUserToken();
  console.log(storedToken);
  const res = await fetch(`${apiUrl}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify(eventDetails),
  });

  const data = await res.json();
  console.log(data);
  revalidatePath("/user");

  if (!res.ok) throw new Error(data.error);
};
export const updateEvent = async (
  eventDetails: {
    title: string;
    numOfParticipants: number;
    organisationName: string;
    logoImage: string;
  },
  eventId: string
) => {
  const storedToken = await getUserToken();
  console.log(storedToken);
  const res = await fetch(`${apiUrl}/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify(eventDetails),
  });

  const data = await res.json();
  console.log(data);
  revalidatePath("/user");

  if (!res.ok) throw new Error(data.error);
};
export const updateEventNumbersLeft = async (
  eventId: string,
  numbersLeft: number
) => {
  console.log(numbersLeft);

  const storedToken = await getUserToken();

  const res = await fetch(`${apiUrl}/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify({ eventId, numbersLeft }),
  });

  const data = await res.json();
  console.log(data);
  revalidatePath(`/user/events/${eventId}/spin`);
};

export const getEvents = async (pageNum = "1") => {
  const storedToken = await getUserToken();

  const res = await fetch(`${apiUrl}/events?page=${pageNum}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();

  return data; // Adjust depending on the structure of your API response
};

export const deleteEvent = async (eventId: string) => {
  const storedToken = await getUserToken();

  const res = await fetch(`${apiUrl}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  revalidatePath("/user");

  return data;
};

export const getEvent = async (eventId: string) => {
  const storedToken = await getUserToken();

  const res = await fetch(`${apiUrl}/events/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data;
};

export const getResults = async (eventId: string, page = "1") => {
  const res = await fetch(`${apiUrl}/results?eventId=${eventId}&page=${page}`, {
    method: "GET", // GET request does not need a body
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data;
};

export const getAllResults = async (eventId: string) => {
  const res = await fetch(`${apiUrl}/results/all?eventId=${eventId}`, {
    method: "GET", // GET request does not need a body
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error);

  return data;
};

export const addResult = async (eventId: string, ticketNumber: number) => {
  console.log(eventId, ticketNumber);

  const res = await fetch(`${apiUrl}/results`, {
    method: "POST", // Use POST instead of GET for creating a new result
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId, ticketNumber }), // Send the data in the body
  });

  // Check if the response was successful
  if (res.ok) {
    revalidatePath(`/user/events/${eventId}/spin`);
  } else {
    const data = await res.json();
    // Handle error if the request fails
    console.error("Failed to add result", res.statusText);
    throw new Error(data.error);
  }
};

export const clearResults = async (eventId: string) => {
  await fetch(`${apiUrl}/results/deleteAll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId }),
  });

  revalidatePath(`/user/events/${eventId}/spin`);
};
