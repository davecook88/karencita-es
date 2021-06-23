import { NextApiRequest, NextApiResponse } from "next";
import { PlacementTestTypes } from "../../../interfaces/placementTest";
import { UserTypes } from "../../../interfaces/user";
import { PlacementTestModel } from "../../../models/PlacementTest";

import UserModel from "../../../models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  switch (req.method) {
    case "GET":
      try {
        const users = await UserModel.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const placementTest = new PlacementTestModel(
          req.body as PlacementTestTypes.TestStructure
        ); /* create a new model in the database */
        const newPlacementTest = await placementTest.save();
        res.status(201).json({
          success: true,
          data: newPlacementTest,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
