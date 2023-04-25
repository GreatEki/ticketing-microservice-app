import mongoose, { Schema } from "mongoose";

interface PaymentAttr {
  orderId: string;
  stripeId: string;
}

interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  buildNewDocument(attr: PaymentAttr): PaymentDoc;
}

const PaymentSchema: Schema = new Schema<PaymentAttr>(
  {
    orderId: { type: String, required: true },
    stripeId: { type: String, required: true },
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

PaymentSchema.statics.buildNewDocument = (attr: PaymentAttr) => {
  return new Payment(attr);
};

export const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "payment",
  PaymentSchema
);
