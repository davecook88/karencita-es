import { NextApiRequest, NextApiResponse } from "next";
import { PlacementTestTypes } from "../../../interfaces/placementTest";
import { UserTypes } from "../../../interfaces/user";
import { PlacementTestModel, QuestionModel, AnswerModel } from "../../../models/PlacementTest";

// Route will be /api/placementTests/[PLACEMENT_TEST_ID]/[QUESTION_ID]

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const [placementTestId, questionId] = req.query.id as unknown as string[]
  const questionBody = req.body



  // const q = new QuestionModel(question)
  if (questionId) {
    switch (req.method) {
      case "PUT":
        try {
          const updated = await PlacementTestModel.findOneAndUpdate(
            { "_id": placementTestId, "questions._id": questionId },
            {
              "$set": {
                "questions.$": questionBody
              }
            }
          ); /* find all the data in our database */
          res.status(200).json({ success: true, data: updated });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    const question = new QuestionModel({
      type: questionBody.type,
      questionText: questionBody.questionText
    })
    const questionDoc = await question.save()
    const doc = await PlacementTestModel.findById(placementTestId)
    doc.questions.push(questionDoc._id)
    const newDoc = await doc.save()
    res.status(200).json({ success: true, data: newDoc.toObject() });
  }

};

export default handler;
