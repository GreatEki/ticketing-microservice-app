import { natsWrapper } from "../../nats-wrapper";
import { ExpirationCompleteListener } from "../ExpirationCompleteListener";
import { Order, Ticket } from "../../../models";
import mongoose from "mongoose";
import {
  OrderStatus,
  ExpirationCompleteEvent,
} from "@greateki-ticket-ms-demo/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  // build an order and associate with ticket
  const ticket = Ticket.buildNewDocument({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 50,
  });
  await ticket.save();

  const order = Order.buildNewDocument({
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  //   create event
  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, order, data, msg };
};

it("updates an order cancelled event", async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emit an OrderCancelled event", async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(eventData.id).toEqual(order.id);
});

it("ack the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
