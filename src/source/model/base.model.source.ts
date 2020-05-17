import { Schema } from 'mongoose';

export const SourceSchema = new Schema({
  name: {
    required: true,
    type: String
  },

  url: {
    required: true,
    type: String
  },
});
