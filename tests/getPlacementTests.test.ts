import dbConnect from "../utils/mongodb";
import fetch from "node-fetch";
import { getAllUsers } from "../utils/getUsers";

describe("User", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  it("creates a new user in db", async () => {
    const tests = await getAllUsers();
    console.log(tests);
  });
});
