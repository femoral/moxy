import Ajv from "ajv";
import {JTDDataType} from "ajv/dist/types/jtd-schema";
import {addPathSchema} from "../../paths/schema/add-path.schema";

const ajv = new Ajv();

export const addCollectionRequestSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: "^[A-Za-z0-9-_ ]{4,}$",
      nullable: false,
    },
    basePath: {
      type: "string",
      pattern: "^[A-Za-z0-9-_]{4,}$",
      nullable: false,
    },
    paths: {
      type: "array",
      nullable: false,
      items: addPathSchema,
    },
  },
  required: ["name", "basePath"],
  additionalProperties: true,
};

export type CreateCollectionRequest = JTDDataType<typeof addCollectionRequestSchema>;

export const addCollectionValidator = ajv.compile<CreateCollectionRequest>(
  addCollectionRequestSchema
);
