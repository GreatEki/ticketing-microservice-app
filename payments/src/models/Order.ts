import { OrderStatus } from "@greateki-ticket-ms-demo/common";
import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs {
  id: String;
  version: number;
  price: number;
  userId: string;
  status: OrderStatus;
}

interface OrderDoc extends mongoose.Document {
  version: number;
  price: number;
  userId: string;
  status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  buildNewDocument(attrs: OrderAttrs): OrderDoc;

  findByEvent(event: { id: string; version: number }): Promise<OrderDoc | null>;
}

const OrderSchema: Schema = new Schema<OrderAttrs>(
  {
    userId: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, enum: OrderStatus },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

OrderSchema.set("versionKey", "version");
OrderSchema.plugin(updateIfCurrentPlugin);

OrderSchema.statics.buildNewDocument = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

OrderSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Order.findOne({ _id: event.id, version: event.version - 1 });
};

export const Order = mongoose.model<OrderDoc, OrderModel>("order", OrderSchema);
