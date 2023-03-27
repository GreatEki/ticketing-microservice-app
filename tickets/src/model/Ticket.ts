import mongoose, { Schema } from "mongoose";
import { TicketAttrs, TicketDoc, TicketModel } from "../interface";

export const TicketSchema: Schema = new Schema<TicketAttrs>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
      },
    },
  }
);

const Ticket = mongoose.model<TicketDoc, TicketModel>("ticket", TicketSchema);

TicketSchema.statics.buildNewDocument = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

export default Ticket;
