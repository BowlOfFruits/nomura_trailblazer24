'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Spin, notification, InputNumber } from 'antd';
import { getApi } from '../api';
import useUserStore from '../context/userStore';


const { Option } = Select;

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm();
  const userStore = useUserStore();

  useEffect(() => {
    // Simulate fetch delay
    setTimeout(() => {
      // Set form fields with user details
      form.setFieldsValue({
        name: userStore.user,
        riskTolerance: userStore.riskTolerance,
        sector: userStore.sector,
        investmentHorizon: userStore.investmentHorizon,
      });
      setIsLoading(false);
    }, 1000);
  }, [form]);

  const onFinish = (values: any) => {
    console.log('Form values:', values);

    // Store in Zustand
    userStore.setRiskTolerance(values.riskTolerance);
    userStore.setSector(values.sector);
    userStore.setInvestmentHorizon(values.investmentHorizon);

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
    >
      <Form.Item
        name="name"
        label="Name"
      >
        <Input disabled/>
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
        label="Investment Horizon"
        rules={[{ required: true, message: 'Please select an option!' }]}
      >
        <Select placeholder="Select an option" >
          <Option value="short-term">Short</Option>
          <Option value="long-term">Long</Option>
        </Select>
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
