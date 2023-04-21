import { app } from "../../../app";
import request from "supertest";
import mongoose from "mongoose";
import { Order } from "../../../models";
import { OrderStatus } from "@greateki-ticket-ms-demo/common";

it("returns 404 for unexisting order", async () => {
  await request(app).post("/api/payments").set("Cookie", global.signup()).send({
    token: "hefjdwnasfasflasa",
    orderId: new mongoose.Types.ObjectId().toHexString(),
  });

  expect(404);
});

it("returns a 401 for unauthorized users attempting purchase", async () => {
  const order = Order.buildNewDocument({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 50,
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    version: 0,
  });

  await order.save();

  await request(app).post("/api/payments").set("Cookie", global.signup()).send({
    token: "hefjdwnasfasflasa",
    orderId: order.id,
  });

  expect(401);
});

it("returns 400 for orders that has been cancelled", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.buildNewDocument({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 50,
    userId: userId,
    status: OrderStatus.Cancelled,
    version: 0,
  });

  await order.save();

  await request(app)
    .post("api/payments")
    .set("Cookie", global.signup(userId))
    .send({
      token: "hgjf[ldsfjdaflasf7373",
      orderId: order.id,
    });

  expect(400);
});
