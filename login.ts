import { handle } from "@hono/core";
import { json } from "@hono/body-parser";
import { response } from "@hono/response";
import { UserDO } from "./user";

export default handle(
  "POST",
  "/login",
  json(async (request) => {
    const { email, password } = request.body;
    if (!email || !password) {
      return response({ status: 400, body: "Email and password are required" });
    }
    const user = new UserDO(request);
    const storedUser = await user.read(email);
    if (!storedUser || storedUser.password !== password) {
      return response({ status: 401, body: "Invalid email or password" });
    }
    // Generate and return a JWT token for authentication
    const token = "JWT token";
    return response({ body: { token } });
  })
);
