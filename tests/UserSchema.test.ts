import dbConnect from "../utils/mongodb";
import UserModel from "../models/User";

describe("User", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  it("creates a new user in db", async () => {
    const user = new UserModel({
      email: "davecook@hotmail.co.uk",
    });

    return user.save((err, user) => {
      expect(err).toBe(null);
      expect(user).toHaveProperty("email");
    });
  });
});
