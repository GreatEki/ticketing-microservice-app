import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
  orderId?: string;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  orderId: string;
  version: number;
}

export interface TicketModel extends mongoose.Model<TicketDoc> {
  buildNewDocument(attrs: TicketAttrs): TicketDoc;
}

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

TicketSchema.statics.buildNewDocument = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("ticket", TicketSchema);

export default Ticket;
