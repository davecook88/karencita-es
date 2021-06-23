import { NextApiRequest, NextApiResponse } from "next";
import { UserTypes } from "../../../interfaces/user";

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
        console.log(error);
        res.status(400).json({ success: false, error });
      }
      break;
    case "POST":
      try {
        const user = new UserModel(
          req.body as UserTypes.CreateUserPayload
        ); /* create a new model in the database */
        const newUser = await user.save();
        res.status(201).json({ success: true, data: newUser });
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
