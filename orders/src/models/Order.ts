import mongoose, { Schema } from "mongoose";
import { OrderStatus } from "@greateki-ticket-ms-demo/common";
import { TicketDoc } from "./Ticket";

interface OrderAttr {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  buildNewDocument(attrs: OrderAttr): OrderDoc;
}

const OrderSchema: Schema = new Schema<OrderAttr>(
  {
    userId: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: OrderStatus,
      default: OrderStatus.Created,
    },
    expiresAt: { type: mongoose.Schema.Types.Date },
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "ticket" },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Order = mongoose.model<OrderDoc, OrderModel>("order", OrderSchema);

OrderSchema.statics.buildNewDocument = (attrs: OrderAttr) => {
  return new Order(attrs);
};
