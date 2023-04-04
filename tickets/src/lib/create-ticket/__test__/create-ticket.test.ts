import request from "supertest";
import { app } from "../../../app";
import Ticket from "../../../model/Ticket";
import { natsWrapper } from "../../../events/nats-wrapper";

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

it("returns an error if title or price is not provided", async () => {
  await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signup())
    .send({ title: "" })
    .expect(400);

  await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signup())
    .send({ price: 10 })
    .expect(400);
});

it("creates a ticket with  valid inputs", async () => {
  const tickets = await Ticket.find({});

  const newTicket = {
    title: "new title",
    price: 20,
  };

  await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signup())
    .send(newTicket)
    .expect(201);
});

it("publishes an event", async () => {
  const newTicket = {
    title: "new title",
    price: 20,
  };

  await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signup())
    .send(newTicket)
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
