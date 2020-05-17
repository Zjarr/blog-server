import { Schema } from 'mongoose';

export const SocialSchema = new Schema({
  icon: {
    required: true,
    type: String
  },

  name: {
    required: true,
    type: String
  },

  url: {
    required: true,
    type: String
  },
});
