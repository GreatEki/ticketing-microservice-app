import mongoose, { Schema } from "mongoose";

interface TicketAttrs {
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
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
  return new Ticket(attrs);
};
