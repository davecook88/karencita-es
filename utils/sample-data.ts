import { PlacementTestConfig, User } from "../interfaces";

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Caroline" },
  { id: 104, name: "Dave" },
];

export const placementTestData: PlacementTestConfig.Test[] = [
  {
    slug: "thrive-in-spanish-conversation",
    id: "0",
    questions: [],
    description: "",
    image: {
      url: "https://source.unsplash.com/random",
      title: "Thrive in Spanish",
    },
    name: "Thrive in Mexico Conversation Course",
  },
  {
    slug: "thrive-in-spanish-conversation",
    id: "1",
    questions: [],
    description: "",
    image: {
      url: "https://source.unsplash.com/random",
      title: "Thrive in Spanish",
    },
    name: "Thrive in Mexico Conversation Course",
  },
];
