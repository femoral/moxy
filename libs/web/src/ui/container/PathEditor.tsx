import { Form, Input, Radio, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import MockEditor from './MockEditor';
import { IPathContext, PathContext } from '../context/PathProvider';
import ProxyEditor from './ProxyEditor';

const methods = ['get', 'post', 'patch', 'options', 'put', 'all'];

const initialType = 'mock';
const PathEditor = () => {
  const { savePath, form, collectionId, isDrawerVisible } =
    useContext<IPathContext>(PathContext);
  const [selectedType, setSelectedType] = useState(initialType);

  useEffect(() => {
    setSelectedType(form?.getFieldValue('type') || 'mock');
  }, [form, isDrawerVisible]);

  const initialValues = {
    collection: collectionId,
    contentType: 'application/json',
    encoded: false,
    method: 'get',
    path: '',
    responseBody: undefined,
    type: initialType,
    targetScheme: 'http://',
    targetHost: '',
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      layout={'vertical'}
      form={form}
      onFinish={savePath}
      initialValues={initialValues}
    >
      <Form.Item name={'collection'} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={'id'} hidden>
        <Input />
      </Form.Item>
      <Input.Group compact>
        <Form.Item name={'method'} style={{ width: '22%', textAlign: 'left' }}>
          <Select>
            {methods.map((method) => (
              <Select.Option key={method} value={method}>
                {method.toUpperCase()}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ width: '78%' }}
          name={'path'}
          required
          rules={[
            { required: true, message: 'Please input path' },
            {
              pattern:
                /^([a-zA-Z0-9-_~$.&@]+|\/\*)(\/[a-zA-Z0-9-_~$.&@]+|\/\*)*$/,
              message: 'Please input valid path',
            },
          ]}
        >
          <Input addonBefore={'/'} placeholder="path/to/match" />
        </Form.Item>
      </Input.Group>
      <Form.Item name="type">
        <Radio.Group onChange={(event) => setSelectedType(event.target.value)}>
          <Radio.Button value="mock">Mock</Radio.Button>
          <Radio.Button value="proxy">Proxy</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {selectedType === 'proxy' ? <ProxyEditor /> : <MockEditor />}
    </Form>
  );
};

export default PathEditor;
