import { natsWrapper } from "../../nats-wrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";
import Ticket from "../../../model/Ticket";
import mongoose from "mongoose";
import {
  OrderCancelledEvent,
  OrderStatus,
} from "@greateki-ticket-ms-demo/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.buildNewDocument({
    title: "concert",
    price: 50,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();

  await ticket.updateOne({ orderId });

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    status: OrderStatus.Cancelled,
    expiresAt: "1pm",
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  //   @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};

it("updates the ticket, publishes an event, and acks the message", async () => {
  const { listener, ticket, data, msg, orderId } = await setup();

  listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
