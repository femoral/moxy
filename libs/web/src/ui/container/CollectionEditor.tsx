import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, Form, FormInstance, Input } from 'antd';
import { CollectionContext, ICollectionContext } from '../context/CollectionProvider';
import ProxyEditor from './ProxyEditor';

const CollectionEditor = ({ form }: ICollectionEditorProps) => {
  const { saveCollection, selectedCollection } = useContext<ICollectionContext>(CollectionContext);
  const [fallbackProxyEnabled, setFallbackProxyEnabled] = useState(false);

  useEffect(() => {
    form.resetFields();
    setFallbackProxyEnabled(form?.getFieldValue('fallbackProxyEnabled'));
  }, [selectedCollection, form]);

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      layout={'vertical'}
      form={form}
      onFinish={saveCollection}
      initialValues={{
        id: selectedCollection?.id,
        basePath: selectedCollection?.basePath || '',
        fallbackProxyEnabled: selectedCollection?.fallbackProxyEnabled || false,
        targetScheme: selectedCollection?.targetScheme || 'https://',
        targetHost: selectedCollection?.targetHost || '',
      }}
    >
      <Form.Item name={'id'} hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label="Name"
        name={'name'}
        initialValue={selectedCollection?.name || ''}
        rules={[{ required: true, message: 'Please input collection name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Base Path"
        name={'basePath'}
        rules={[
          { required: true, message: 'Please input base path' },
          {
            pattern: /^[a-zA-Z0-9-_]+$/,
            message: 'Please input valid base path',
          },
        ]}
      >
        <Input addonBefore={'/'} />
      </Form.Item>
      <Form.Item name={'fallbackProxyEnabled'} valuePropName={'checked'}>
        <Checkbox
          onChange={(event) => {
            console.log(event.target.checked);
            setFallbackProxyEnabled(event.target.checked);
          }}
        >
          Enable fallback proxy
        </Checkbox>
      </Form.Item>
      {(selectedCollection?.fallbackProxyEnabled || fallbackProxyEnabled) && <ProxyEditor />}
    </Form>
  );
};

interface ICollectionEditorProps {
  form: FormInstance;
}

export default CollectionEditor;
