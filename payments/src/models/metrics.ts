import mongoose from 'mongoose';
const { Schema } = mongoose;

var connection = mongoose.createConnection('mongodb://host.docker.internal:27017/metrics');

const metricsSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  metrics: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const Metrics = connection.model('Metrics', metricsSchema);

export { Metrics };
