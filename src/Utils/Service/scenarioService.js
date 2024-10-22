import { listAIScenarios } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export async function fetchScenarios() {
  try {
    const { data } = await client.graphql({ query: listAIScenarios });
    const allScenarios = data.listAIScenarios.items;
    return allScenarios;
  } catch (error) {
    console.error("Error fetching scenarios", error);
  }
}
