import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
  biller: {
    type: String,
    required: true,
  },
  refNo: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export { Payment };
