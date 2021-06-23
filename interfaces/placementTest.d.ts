import { TEST_CONFIG } from "../utils/config";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
config;
export namespace PlacementTestTypes {
  export interface TestStructure {
    _id?: string;
    slug: string;
    description: string;
    image: Image;
    name: string;
    level: ArrayElement<TEST_CONFIG.levels>;
  }
  export interface Test extends TestStructure {
    _id: string;
    questions: Question[];
  }

  export interface TestComplete extends Test {
    answers: Answer[];
  }

  export interface GetTestApiResponse extends Test {
    _id: string;
  }

  export interface GetTestStructureApiResponse extends TestStructure {
    _id: string;
  }

  export interface GetTestCompleteApiResponse extends TestComplete {
    _id: string;
  }

  export type QuestionType = ArrayElement<TEST_CONFIG.questionTypes>;

  export interface Question {
    _id: string;
    type: QuestionType;
    questionText: string;
  }

  export interface MultipleChoiceQuestion extends Question {
    type: "multiple-choice";
    choices: MultipleChoiceQuestionChoice[];
    answer: Answer
  }

  export interface MultipleChoiceQuestion extends Question {
    type: "multiple-choice";
    choices: MultipleChoiceQuestionChoice[];
  }

  export interface MultipleChoiceQuestionChoice {
    id: string;
    displayValue: string;
  }

  export interface Answer {
    questionId?: string;
    answers?: string[];
    answerIndexes?: number[];
  }


  interface Image {
    url: string;
    title: string;
  }
}
