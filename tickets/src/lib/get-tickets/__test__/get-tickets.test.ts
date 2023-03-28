import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";

it("it returns a status of 4o4 if ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/show/${id}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const title = "Maiden Show";
  const price = 20;

  const response = await request(app)
    .post("api/tickets/create")
    .set("Cookie", global.signup())
    .send({ title, price })
    .expect(201);

  const getTicketResponse = await request(app)
    .get(`/api/tickets/show/${response.body.id}`)
    .send()
    .expect(200);

  expect(getTicketResponse.body.title).toEqual(title);
  expect(getTicketResponse.body.price).toEqual(price);
});

const createTicket = () => {
  return request(app)
    .post("api/tickets/create")
    .set("Cookie", global.signup())
    .send({ title: "test ticker", price: 20 });
};

it("it should return a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
    .get("/api/tickets/show")
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
