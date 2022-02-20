import React, { Fragment } from "react";
import { Form, Input, Select } from "antd";

const MockEditor = () => {
  const schemeSelector = (
    <Form.Item name={"targetScheme"} noStyle>
      <Select>
        {["http://", "https://"].map((scheme, index) => (
          <Select.Option key={index} value={scheme}>
            {scheme}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <Fragment>
      <Form.Item
        name={"targetHost"}
        rules={[
          { required: true, message: "Please input target host" },
          {
            pattern: /^[\w-.]+(:[0-9]{1,5})?$/,
            message: "Please input valid target host",
          },
        ]}
      >
        <Input addonBefore={schemeSelector} placeholder={"www.google.com"} />
      </Form.Item>
    </Fragment>
  );
};

export default MockEditor;
