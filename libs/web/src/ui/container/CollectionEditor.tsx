import React, { useContext, useEffect } from 'react';
import { Form, FormInstance, Input } from 'antd';
import {
  CollectionContext,
  ICollectionContext,
} from '../context/CollectionProvider';

const CollectionEditor = ({ pathEditorForm }: ICollectionEditorProps) => {
  const { saveCollection, selectedCollection } =
    useContext<ICollectionContext>(CollectionContext);

  useEffect(() => {
    pathEditorForm.resetFields();
  }, [selectedCollection, pathEditorForm]);

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      layout={'vertical'}
      form={pathEditorForm}
      onFinish={saveCollection}
    >
      <Form.Item name={'id'} initialValue={selectedCollection?.id} hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label="Name"
        name={'name'}
        initialValue={selectedCollection?.name || ''}
        requiredMark={'optional'}
        rules={[{ required: true, message: 'Please input collection name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Base Path"
        name={'basePath'}
        initialValue={selectedCollection?.basePath || ''}
        requiredMark={'optional'}
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
    </Form>
  );
};

interface ICollectionEditorProps {
  pathEditorForm: FormInstance;
}

export default CollectionEditor;
