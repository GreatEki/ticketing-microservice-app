import { app } from "../../../app";
import request from "supertest";
import { Ticket } from "../../../models";
import mongoose from "mongoose";

const buildTicket = async () => {
  const ticket = Ticket.buildNewDocument({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  return ticket;
};

it("returns a list of orders for a particular user", async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signup();
  const userTwo = global.signup();

  await request(app)
    .post("/api/orders/create")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  const { body: userTwoFirstOrder } = await request(app)
    .post("/api/orders/create")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);
  const { body: userTwoSecondOrder } = await request(app)
    .post("/api/orders/create")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  const response = await request(app)
    .get("/api/order/show")
    .set("Cookie", userTwo)
    .expect(200);

  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(userTwoFirstOrder.id);
  expect(response.body[1].id).toEqual(userTwoSecondOrder.id);
  expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(response.body[1].ticket.id).toEqual(ticketThree.id);
});

it("returns an actual order", async () => {
  const ticket = await buildTicket();

  const user = global.signup();

  const { body: order } = await request(app)
    .post("/api/orders/create")
    .set("Cookie", user)
    .send({ ticketId: ticket.id });
  expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/order/show/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error for an invalid user order", async () => {
  const ticket = await buildTicket();

  const user = global.signup();

  const { body: order } = await request(app)
    .post("/api/orders/create")
    .set("Cookie", user)
    .send({ ticketId: ticket.id });
  expect(201);

  await request(app)
    .get(`/api/orders/show/${order.id}`)
    .set("Cookie", global.signup())
    .send()
    .expect(401);
});
