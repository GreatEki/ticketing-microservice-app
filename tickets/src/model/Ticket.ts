import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { TicketAttrs, TicketDoc, TicketModel } from "../interface";

export const TicketSchema: Schema = new Schema<TicketAttrs>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    orderId: { type: String },
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

TicketSchema.set("versionKey", "version");
TicketSchema.plugin(updateIfCurrentPlugin);

const Ticket = mongoose.model<TicketDoc, TicketModel>("ticket", TicketSchema);

TicketSchema.statics.buildNewDocument = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

export default Ticket;
