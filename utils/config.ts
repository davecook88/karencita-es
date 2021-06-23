export const BASE_URL =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "http://localhost:3000/"
    : "";

export const TEST_CONFIG = {
  levels: [
    "elementary",
    "pre-intermediate",
    "intermediate",
    "upper-intermediate",
    "advanced",
  ],

  questionTypes: [
    "multiple-choice"
  ]
};
