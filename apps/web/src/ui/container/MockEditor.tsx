import React, { Fragment } from "react";
import { Checkbox, Form, Input } from "antd";

const MockEditor = () => {
  return (
    <Fragment>
      <Form.Item name={"encoded"} valuePropName={"checked"}>
        <Checkbox>Encoded</Checkbox>
      </Form.Item>
      <Form.Item
        label="Content Type"
        name={"contentType"}
        requiredMark={"optional"}
        rules={[
          { required: true, message: "Please input content type" },
          {
            pattern: /^[-\w.]+\/[-\w.+,]+$/,
            message: "Please input valid content type",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Body" name={"responseBody"}>
        <Input.TextArea autoSize={true} placeholder={'{"some": "json"}'} />
      </Form.Item>
    </Fragment>
  );
};

export default MockEditor;
