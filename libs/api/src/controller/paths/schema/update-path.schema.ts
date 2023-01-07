import Ajv from 'ajv';
import { JTDDataType } from 'ajv/dist/types/jtd-schema';
import {
  addMockSchema,
  addProxySchema,
  pathProperties as addPathProperties,
} from './add-path.schema';

const ajv = new Ajv();

const pathProperties = {
  ...addPathProperties,
};

export const updateProxySchema = {
  required: [...addProxySchema.required],
  properties: {
    ...pathProperties,
    ...addProxySchema.properties,
  },
  additionalProperties: true,
};

export const updateMockSchema = {
  required: [...addMockSchema.required],
  properties: {
    ...pathProperties,
    ...addMockSchema.properties,
  },
  additionalProperties: true,
};

export const updatePathSchema = {
  type: 'object',
  oneOf: [updateMockSchema, updateProxySchema],
};

export type AddPathRequest =
  | JTDDataType<typeof updateMockSchema>
  | JTDDataType<typeof updateProxySchema>;

export const updatePathValidator =
  ajv.compile<AddPathRequest>(updatePathSchema);
