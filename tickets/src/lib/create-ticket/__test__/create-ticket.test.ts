import request from "supertest";
import { app } from "../../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets/create").send({});

  expect(response.status).not.toEqual(404);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signup())
    .send({});

  expect(response.status).not.toEqual(401);
});
