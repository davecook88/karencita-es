export namespace PlacementTestTypes {
  export interface TestStructure {
    id: string;
    slug: string;
    description: string;
    image: Image;
    name: string;
  }
  export interface Test extends TestStructure {
    questions: Question[];
  }

  export interface TestComplete extends Test {
    answers: Answer[];
  }

  export interface Question {
    id: string;
    type: "multiple-choice";
    questionText: string;
  }

  export interface Answer {
    questionId: string;
    answer: number | string;
  }
  interface Image {
    url: string;
    title: string;
  }
}
