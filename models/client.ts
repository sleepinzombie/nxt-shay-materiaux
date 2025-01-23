import type { IClient } from '@/types/api/client';

import mongoose, { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';
import { Shop } from './shop';
import { Payment } from './payment';

export const clientSchema = new Schema<IClient>({
  createDateTime: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  nid: { type: String, required: false },
  brnNumber: { type: Number, required: false },
  phoneNumber: { type: Number, required: false },
  mobileNumber: { type: Number, required: false },
  shops: [{ type: Schema.Types.ObjectId, ref: Shop.modelName }],
  deliveryDateTime: { type: Number, required: false },
  payments: [{ type: Schema.Types.ObjectId, ref: Payment.modelName }]
});

export const Client: Model<IClient> =
  mongoose.models.Client || model<IClient>('Client', clientSchema, 'clients');
