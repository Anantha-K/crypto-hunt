import mongoose from 'mongoose';

const ContestSettingsSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
  isActive: Boolean
});

export default mongoose.models.ContestSettings || mongoose.model('ContestSettings', ContestSettingsSchema);