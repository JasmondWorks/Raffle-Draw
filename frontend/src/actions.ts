"use server";

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
  try {
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

    return { status: "success", data: { user, token } };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", data: error.message };
    } else {
      return { status: "error", data: "An unknown error occurred" };
    }
  }
};

export const signUp = async (userDetails: {
  email: string;
  password: string;
}) => {
  try {
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

    return { status: "success", data: { user, token } };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", data: error.message };
    } else {
      return { status: "error", data: "An unknown error occurred" };
    }
  }
};
export const authenticate = async () => {
  try {
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

    return { status: "success", data };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", data: error.message };
    } else {
      return { status: "error", data: "An unknown error occurred" };
    }
  }
};

export const createEvent = async (eventDetails: {
  title: string;
  numOfParticipants: number;
  organisationName: string;
  logoImage: string;
}) => {
  try {
    const storedToken = await getUserToken();
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

    return { status: "success", data };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", data: error.message };
    } else {
      return { status: "error", data: "An unknown error occurred" };
    }
  }
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
  try {
    const storedToken = await getUserToken();

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

    return { status: "success", data };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", data: error.message };
    } else {
      return { status: "error", data: "An unknown error occurred" };
    }
  }
};

export const getEvents = async (pageNum = "1") => {
  try {
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

    return { status: "success", data };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", data: error.message };
    } else {
      return { status: "error", data: "An unknown error occurred" };
    }
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
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

    return { status: "success", data };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", data: error.message };
    } else {
      return { status: "error", data: "An unknown error occurred" };
    }
  }
};

export const getEvent = async (eventId: string) => {
  try {
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

    return { status: "success", data };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", data: error.message };
    } else {
      return { status: "error", data: "An unknown error occurred" };
    }
  }
};

export const getResults = async (eventId: string, page = "1") => {
  try {
    const res = await fetch(
      `${apiUrl}/results?eventId=${eventId}&page=${page}`,
      {
        method: "GET", // GET request does not need a body
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    return { status: "success", data };
  } catch (error) {
    return { status: "error", data: error };
  }
};

export const getAllResults = async (eventId: string) => {
  try {
    const res = await fetch(`${apiUrl}/results/all?eventId=${eventId}`, {
      method: "GET", // GET request does not need a body
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    return { status: "success", data };
  } catch (error) {
    return { status: "error", data: error };
  }
};

export const addResult = async (eventId: string, ticketNumber: number) => {
  try {
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
      return { status: "success", data: "Result added successfully" };
    } else {
      const data = await res.json();
      // Handle error if the request fails
      console.error("Failed to add result", res.statusText);
      throw new Error(data.error);
    }
  } catch (error) {
    return { status: "error", data: error };
  }
};

export const clearResults = async (eventId: string) => {
  try {
    await fetch(`${apiUrl}/results/deleteAll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId }),
    });

    revalidatePath(`/user/events/${eventId}/spin`);

    return { status: "success", data: "Results cleared successfully" };
  } catch (error) {
    return { status: "error", data: error };
  }
};
