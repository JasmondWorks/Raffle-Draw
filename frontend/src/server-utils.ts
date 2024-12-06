import { cookies } from "next/headers";

export async function getUserToken() {
  const tokenCookie = await cookies().get("token"); // Directly access cookies
  return tokenCookie ? tokenCookie.value : null; // Safely handle potential null
}
