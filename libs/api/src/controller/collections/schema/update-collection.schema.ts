import Ajv from 'ajv';
import { JTDDataType } from 'ajv/dist/types/jtd-schema';
import { addCollectionRequestSchema } from './add-collection.schema';

const ajv = new Ajv();

export type UpdateCollectionRequest = JTDDataType<
  typeof addCollectionRequestSchema
>;

export const updateCollectionValidator = ajv.compile<UpdateCollectionRequest>(
  addCollectionRequestSchema
);
