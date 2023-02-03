import request from "supertest";
import { app } from "../../../app";

it("fails when non existing email is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("fails for incorrect credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@incorrect.com", password: "password" })
    .expect(400);
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "incorrect-password" })
    .expect(400);
});

it("attached cookie to header on successful login", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
