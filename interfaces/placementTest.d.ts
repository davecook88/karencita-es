export namespace PlacementTestTypes {
  export interface TestStructure {
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

  export interface GetTestApiResponse extends Test {
    id: string;
  }

  export interface GetTestStructureApiResponse extends TestStructure {
    id: string;
  }

  export interface GetTestCompleteApiResponse extends TestComplete {
    id: string;
  }

  export interface Question {
    id: string;
    type: "multiple-choice";
    questionText: string;
  }

  export interface Answer {
    questionId: string;
    answer?: string;
    answerIndex?: number;
  }
  interface Image {
    url: string;
    title: string;
  }
}
