// components/AddStockModal.js
import React, { useState } from 'react';
import { Button, Modal, DatePicker, Select, Form, Input, InputNumber, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import usePortfolioStore from '../context/portfolioStore';

const { Option } = Select;

const AddPurchase = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const portfolioStore = usePortfolioStore();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      
      // Send data to the API
      const response = await fetch('/api/add-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Stock added successfully!');
        form.resetFields();
        setIsModalVisible(false);
      } else {
        message.error('Failed to add stock.');
      }
    } catch (error) {
      message.error('An error occurred.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    // Handle form submission
    portfolioStore.addStock(values);
    console.log('Form values:', values);
    message.success('Form submitted successfully!');
    form.resetFields();
  };

  return (
    <div>
      <Button onClick={showModal} className='mx-1'>
        <PlusCircleOutlined />
      </Button>
      <Modal
        title="Add New Stock"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <>
            <Form.Item
              name="stockName"
              label="Stock Name"
              rules={[{ required: true, message: 'Please enter the stock name!' }]}
            >
              <Input placeholder="Enter stock name" />
            </Form.Item>
            
            <Form.Item
              name="priceBought"
              label="Purchase Stock Price"
              rules={[{ required: true, message: 'Please enter the purchase stock price!' }]}
            >
              <InputNumber min={0} step={0.01} placeholder="Enter stock price" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="volume"
              label="Purchase Volume"
              rules={[{ required: true, message: 'Please enter the purchase volume!' }]}
            >
              <InputNumber min={0} step={0.01} placeholder="Enter stock volume" style={{ width: '100%' }} />
            </Form.Item>
          </>

          {/* {investmentType === 'treasury' && (
            <>
              <Form.Item
                name="starttime"
                label="Start time"
                rules={[{ required: true, message: 'Please enter the start time!' }]}
              >
                <DatePicker placeholder="Select start time" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="endtime"
                label="End time"
                rules={[{ required: true, message: 'Please enter the end time!' }]}
              >
                <DatePicker placeholder="Select end time" style={{ width: '100%' }} />
              </Form.Item>
              
              <Form.Item
                name="purchaseAmount"
                label="Purchase Amount"
                rules={[{ required: true, message: 'Please enter the purchase amount!' }]}
              >
                <InputNumber min={0} step={0.01} placeholder="Enter purchase amount" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="payoutAmount"
                label="Payout Amount"
                rules={[{ required: true, message: 'Please enter the payout amount!' }]}
              >
                <InputNumber min={0} step={0.01} placeholder="Enter payout amount" style={{ width: '100%' }} />
              </Form.Item>
            </>
          )} */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPurchase