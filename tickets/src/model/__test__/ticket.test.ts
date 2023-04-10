import { app } from "../../app";
import request from "supertest";
import Ticket from "../Ticket";

it("implements optimistic concurrency control", async () => {
  const ticket = Ticket.buildNewDocument({
    title: "concert",
    price: 5,
    userId: "123",
  });
  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  await firstInstance?.updateOne({ price: 10 });

  expect(async () => {
    await secondInstance?.updateOne({ price: 15 });
  }).toThrow();
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.buildNewDocument({
    title: "concert",
    price: 5,
    userId: "123",
  });
  await ticket.save();

  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
