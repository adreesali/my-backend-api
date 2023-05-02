import { handle } from "@hono/core";
import { json, text } from "@hono/body-parser";
import { response } from "@hono/response";
import { UserDO } from "./user";

export default handle(
  "POST",
  "/register",
  json(async (request) => {
    const { email, password } = request.body;
    if (!email || !password) {
      return response({ status: 400, body: "Email and password are required" });
    }
    const user = new UserDO(request);
    await user.create(email, password);
    return response({ body: "User registered successfully" });
  })
);

