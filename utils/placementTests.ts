import { PlacementTestConfig } from "../interfaces";
import { placementTestData } from "./sample-data";

export async function getPlacementTest(slug: string) {
  const test = placementTestData.find((test) => test.slug === slug);

  if (!test) throw new Error("Test not found");
  return test;
}

export async function getAllPlacementTests(): Promise<
  PlacementTestConfig.Test[]
> {
  return placementTestData;
}
