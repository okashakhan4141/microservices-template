import mongoose from 'mongoose';
const { Schema } = mongoose;

const metricsSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  metrics: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const Metrics = mongoose.model('Metrics', metricsSchema);

export { Metrics };
