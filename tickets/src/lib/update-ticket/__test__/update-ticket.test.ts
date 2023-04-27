import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../app";
import { natsWrapper } from "../../../events/nats-wrapper";
import Ticket from "../../../model/Ticket";

it("returns a 404 for an invalid ticket id", async () => {
  const id = "dfdgidfhfinvalid";
  await request(app)
    .put(`/api/tickets/update/${id}`)
    .set("Cookie", global.signup())
    .send({ title: "Invalid ticket", price: 0 })
    .expect(404);
});

it("returns a 401 if a user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/update/${id}`)
    .send({ title: "Invalid ticket", price: 0 })
    .expect(401);
});

it("returns a 401 if the user is not the owner of the ticket", async () => {
  // create ticket
  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signup())
    .send({ title: "Invalid owner ticket test", price: 30 });

  // update with different owner
  // NOTE global.signup gives us a different user
  await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set("Cookie", global.signup())
    .send({ title: "Edit Attempt Invalid owner ticket test", price: 25 })
    .expect(401);
});

it("updates the ticket with valid owner and appropriate data", async () => {
  const userCookie = global.signup();

  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", userCookie)
    .send({ title: "New valid ticket", price: 50 })
    .expect(200);

  // update ticket
  const ticketUpdate = { title: "Edited valid ticket", price: 100 };
  const updatedResponse = await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set("Cookie", userCookie)
    .send(ticketUpdate)
    .expect(200);

  expect(updatedResponse.body.price).toEqual(ticketUpdate.price);
});

it("publishes an event", async () => {
  const userCookie = global.signup();

  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", userCookie)
    .send({ title: "New valid ticket", price: 50 })
    .expect(200);

  // update ticket
  const ticketUpdate = { title: "Edited valid ticket", price: 100 };
  const updatedResponse = await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set("Cookie", userCookie)
    .send(ticketUpdate)
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates if a ticket is reserved", async () => {
  const userCookie = global.signup();

  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", userCookie)
    .send({ title: "New valid ticket", price: 50 })
    .expect(200);

  const ticket = await Ticket.findById(response.body.id);

  // book ticket
  await ticket?.updateOne({
    orderId: new mongoose.Types.ObjectId().toHexString(),
  });

  // update ticket
  const ticketUpdate = { title: "Edited valid ticket", price: 100 };
  const updatedResponse = await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set("Cookie", userCookie)
    .send(ticketUpdate)
    .expect(400);
});
