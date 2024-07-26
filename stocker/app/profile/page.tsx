'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Spin, notification, InputNumber } from 'antd';
import { useUser } from '../context/UserContext';

const { Option } = Select;

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm();
  const { profileDetails, storeProfileDetails } = useUser();

  useEffect(() => {
    // Set the initial values in the form
    form.setFieldsValue({
      name: profileDetails.name || "",
      riskTolerance: profileDetails.riskTolerance || '',
      sector: profileDetails.sector || undefined,
      investmentHorizon: profileDetails.investmentHorizon || undefined
    });
    setIsLoading(false); // Set loading to false after setting initial values
  }, [profileDetails, form]); // Run effect whenever profileDetails or form changes

  const onFinish = (values: any) => {
    console.log('Form values:', values);

    // Store in context
    storeProfileDetails('name', values.name);
    storeProfileDetails('sector', values.sector);
    storeProfileDetails('riskTolerance', values.riskTolerance);
    storeProfileDetails('investmentHorizon', values.investmentHorizon);

    // Display success notification
    notification.success({
      message: 'Success',
      description: 'Profile updated successfully.',
      placement: 'bottomRight'
    });
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Form
      form={form}
      name="profile"
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={(changedValues) => {
        // Update the context state as values change
        Object.entries(changedValues).forEach(([key, value]) => {
          storeProfileDetails(key as keyof typeof profileDetails, value);
        });
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="riskTolerance"
        label="Risk Tolerance"
        rules={[{ required: true, message: 'Please select an option!' }]}
      >
        <Select placeholder="Select an option">
          <Option value="low">Low Risk Tolerance</Option>
          <Option value="moderate">Moderate Risk Tolerance</Option>
          <Option value="high">High Risk Tolerance</Option>
          <Option value="very high">Very High Risk Tolerance</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="sector"
        label="Preferred Sector"
        rules={[{ required: true, message: 'Please select an option!' }]}
      >
        <Select placeholder="Select an option" mode="multiple">
          <Option value="Technology">Technology</Option>
          <Option value="Healthcare">Healthcare</Option>
          <Option value="Non Essential Consumer Discretionary">Non Essential Consumer Discretionary</Option>
          <Option value="Essential Consumer">Essential Consumer</Option>
          <Option value="Energy">Energy</Option>          
        </Select>
      </Form.Item>
      <Form.Item
        name="investmentHorizon"
        label="Investment Horizon (in years)"
        rules={[
          { 
            required: true, 
            message: 'Please input a valid number!' 
          },
          {
            type: 'number',
            min: 0,
            max: 100,
            message: 'Investment horizon must be between 0 and 100 years!'
          }
        ]}
      >
        <InputNumber min={0} max={100} style={{ width: '100%' }}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;
