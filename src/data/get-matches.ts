import { matchesURL } from "@/constants/footstats-url";
import { unstable_noStore } from "next/cache";

export async function getMatches() {
  unstable_noStore();
  try {
    const response = await fetch(matchesURL, {
      headers: { Authorization: `Bearer ${process.env.FOOTSTATS_TOKEN}` },
    });

    return await response.json();
  } catch (error) {
    console.log("Error to get all matches", error);
  }
}
