import { BASE_URL } from "./config";

export async function getPlacementTest(slug: string) {
  // const test = placementTestData.find((test) => test.slug === slug);
  // if (!test) throw new Error("Test not found");
  // return test;
}

export async function getAllPlacementTests(): Promise<any> {
  const url = BASE_URL + "/api/placementTests";
  const placementTestData = await fetch(url).then((res) => res.json());
  return placementTestData;
}
