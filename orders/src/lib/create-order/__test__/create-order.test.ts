import { app } from "../../../app";
import request from "supertest";
import mongoose from "mongoose";
import { Order, Ticket } from "../../../models";
import { OrderStatus } from "@greateki-ticket-ms-demo/common";
import { natsWrapper } from "../../../events/nats-wrapper";

it("returns an error if ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();
  await request(app)
    .post("/api/order/create")
    .set("Cookie", global.signup())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is reserved or locked in", async () => {
  const ticket = Ticket.buildNewDocument({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const order = Order.buildNewDocument({
    userId: "randomgenerate94949",
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket,
  });

  await order.save();
  await request(app)
    .post("/api/orders/create")
    .set("Cookie", global.signup())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket and returns a status code of 201", async () => {
  const ticket = Ticket.buildNewDocument({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders/create")
    .set("Cookie", global.signup())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it("emits an order created event", async () => {
  const ticket = Ticket.buildNewDocument({
    title: "concert",
    price: 50,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders/create")
    .set("Cookie", global.signup())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
