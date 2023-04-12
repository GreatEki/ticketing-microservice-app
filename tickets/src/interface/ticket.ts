import mongoose from "mongoose";

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
