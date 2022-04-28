import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentMetricsSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  metrics: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const PaymentMetrics = mongoose.model('PaymentMetrics', paymentMetricsSchema);

export { PaymentMetrics };
