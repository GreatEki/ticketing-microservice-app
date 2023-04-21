import {
  OrderCancelledEvent,
  OrderStatus,
} from "@greateki-ticket-ms-demo/common";
import { natsWrapper } from "../../nats-wrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.buildNewDocument({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });

  await order.save();

  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    userId: order.userId,
    version: 1,
    expiresAt: "30 April, 2023",
    status: OrderStatus.Cancelled,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: order.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

it("updates the status of the order", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order?.status).toEqual(data.status);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
