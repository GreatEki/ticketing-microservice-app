import mongoose, { Schema } from "mongoose";
import Order, { OrderStatus } from "./Order";

interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  buildNewDocument(attrs: TicketAttrs): TicketDoc;
}

const TicketSchema: Schema = new Schema<TicketAttrs>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
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

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", TicketSchema);

TicketSchema.statics.buildNewDocument = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};

TicketSchema.methods.isReserved = async function () {
  const lockedInOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!lockedInOrder;
};

export default Ticket;
