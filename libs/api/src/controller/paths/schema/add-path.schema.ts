import Ajv from 'ajv';
import { JTDDataType } from 'ajv/dist/types/jtd-schema';

const ajv = new Ajv();

export const pathProperties = {
  method: {
    type: 'string',
    nullable: false,
    enum: ['get', 'post', 'patch', 'options', 'put', 'all'],
  },
  path: {
    type: 'string',
    nullable: false,
    pattern: '^(\\/[a-zA-Z0-9-_~$.&@]+|\\/\\*)+$',
  },
};

export const addMockSchema = {
  required: ['type', 'path', 'method', 'contentType', 'encoded'],
  properties: {
    ...pathProperties,
    type: {
      type: 'string',
      nullable: false,
      enum: ['mock'],
    },
    contentType: {
      type: 'string',
      pattern: '^[-\\w.]+/[-\\w.+,]+$',
      nullable: false,
    },
    encoded: {
      type: 'boolean',
      nullable: false,
    },
    responseBody: {
      type: 'string',
      nullable: true,
    },
  },
  additionalProperties: true,
};

export const addProxySchema = {
  required: ['type', 'path', 'method', 'target'],
  properties: {
    ...pathProperties,
    type: {
      type: 'string',
      nullable: false,
      enum: ['proxy'],
    },
    target: {
      type: 'string',
      nullable: false,
      pattern: '^http[s]?:\\/\\/[a-zA-Z0-9_\\-.]+(:[0-9]{1,5})?$',
    },
  },
  additionalProperties: true,
};

export const addPathSchema = {
  type: 'object',
  oneOf: [addMockSchema, addProxySchema],
};

export type AddPathRequest =
  | JTDDataType<typeof addMockSchema>
  | JTDDataType<typeof addProxySchema>;

export const addPathValidator = ajv.compile<AddPathRequest>(addPathSchema);
