// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export namespace PlacementTestConfig {
  export interface Test {
    id: string;
    slug: string;
    questions: Question[];
    description: string;
    image: Image;
    name: string;
  }

  export interface Question {
    type: "multiple-choice";
    questionText: string;
    answer: number | string;
  }
  interface Image {
    url: string;
    title: string;
  }
}
