'use client'

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Spin, notification, InputNumber } from 'antd';
import { useUser } from '../context/UserContext';
import Header from '../components/header';
import { getApi } from '../api';
import { profileDetails, storeDetails } from './storeDetails';
import { secondsToHours } from 'date-fns';

const { Option } = Select;

const Profile: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm();
  const user = useUser();

  useEffect(() => {
    // Simulate fetch delay
    setTimeout(() => {
      // Set form fields with user details
      form.setFieldsValue({
        name: user.userDetails.name,
        riskTolerance: user.userDetails.riskTolerance,
        secondsToHours: user.userDetails.sector,
        investmentHorizon: user.userDetails.investmentHorizon,
        textField2: user.userDetails.textField2,
      });
      setIsLoading(false);
    }, 1000);
  }, [form, user.userDetails]);

  const onFinish = (values: (data: any) => void) => {
    console.log('Form values:', values);

    // store in local dictionary
    storeDetails('/saveProfile', values)
      .then(response => {
        console.log('Profile updated successfully');
        notification.success({
            message: 'Success',
            description: 'Profile updated successfully.',
            placement:'bottomRight'
          });
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        notification.error({
            message: 'Error',
            description: 'Error updating profile.',
            placement: 'topRight', // Change this to the desired placement
          });
      });
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <Form
        form={form}
        name="profile"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
            name: profileDetails.name || "",
            riskTolerance: profileDetails.riskTolerance || '',
            sector: profileDetails.sector || undefined,
            investmentHorizon: profileDetails.investmentHorizon || undefined,
            textField2: profileDetails.textField2 || ''
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
        <Form.Item
          name="textField2"
          label="Text Field 2"
          rules={[{ required: true, message: 'Please input text!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Profile;
