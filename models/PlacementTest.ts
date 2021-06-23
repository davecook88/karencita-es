import mongoose, { Schema } from "mongoose";
import { PlacementTestTypes } from "../interfaces/placementTest";

const QuestionSchema = new mongoose.Schema<PlacementTestTypes.TestComplete>({
  questionText: { type: String },
  choices: [{
    displayText: { type: String },
    id: { type: Number }
  }],
  type: { type: String },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
});

export const QuestionModel =
  (mongoose.models?.Question as mongoose.Model<
    PlacementTestTypes.Question,
    {},
    {}
  >) || mongoose.model<PlacementTestTypes.Question>("Question", QuestionSchema);

const AnswerSchema = new mongoose.Schema<PlacementTestTypes.TestComplete>({
  answer: [{ type: String }],
  answerIndex: [{ type: Number }],
  type: { type: String },
});

export const AnswerModel =
  (mongoose.models?.Answer as mongoose.Model<
    PlacementTestTypes.Answer,
    {},
    {}
  >) || mongoose.model<PlacementTestTypes.Answer>("Answer", AnswerSchema);

/* UserSchema will correspond to a collection in your MongoDB database. */
const PlacementTestSchema =
  new mongoose.Schema<PlacementTestTypes.TestComplete>({
    name: {
      type: String,
      maxLength: [50, "Please enter a name of less than 50 characters"],
    },
    description: {
      type: String,
      maxLength: [250, "Please enter a name of less than 250 characters"],
    },
    image: {
      url: {
        type: String,
      },
      title: {
        type: String,
      },
    },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],

    slug: {
      type: String,
      required: true,
    },
  });

export const PlacementTestModel =
  (mongoose.models?.PlacementTest as mongoose.Model<
    PlacementTestTypes.TestComplete,
    {},
    {}
  >) ||
  mongoose.model<PlacementTestTypes.TestComplete>(
    "PlacementTest",
    PlacementTestSchema
  );
