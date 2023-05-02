import { handle } from "@hono/core";
import { json } from "@hono/body-parser";
import { response } from "@hono/response";
import { UserDO } from "./user";

export default handle(
  "POST",
  "/forgot-password",
  json(async (request) => {
    const { email } = request.body;
    if (!email) {
      return response
