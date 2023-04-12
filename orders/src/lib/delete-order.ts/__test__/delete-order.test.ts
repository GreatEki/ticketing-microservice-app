import { app } from "../../../app";
import request from "supertest";
import { Ticket } from "../../../models";
import { OrderStatus } from "../../../models/Order";
import { natsWrapper } from "../../../events/nats-wrapper";
import mongoose from "mongoose";

it("marks an order as cancelled", async () => {
  const ticket = Ticket.buildNewDocument({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 50,
  });
  await ticket.save();

  const user = global.signup();

  const { body: order } = await request(app)
    .post("/api/orders/create")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: delOrder } = await request(app)
    .delete(`/api/orders/delete/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(delOrder.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
  const ticket = Ticket.buildNewDocument({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 50,
  });
  await ticket.save();

  const user = global.signup();

  const { body: order } = await request(app)
    .post("/api/orders/create")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/delete/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
