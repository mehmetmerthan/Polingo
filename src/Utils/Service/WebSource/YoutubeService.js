import { generateClient } from "aws-amplify/api";
import { listYoutubes } from "../../../graphql/queries";
const client = generateClient();

export async function fetchYoutubeList() {
  try {
    const { data } = await client.graphql({ query: listYoutubes });
    const allYoutubeVideos = data.listYoutubes.items;
    return allYoutubeVideos;
  } catch (error) {
    console.error("Error fetching youtube videos", error);
  }
}
