import {
  Alert,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  Select,
  Typography,
} from "antd";
import { useNavigate } from "react-router";
import { ShippingData } from "../types/ShippingData";
import { useDispatch, useSelector } from "react-redux";
import { orderFormSlice } from "../store/orderForm.slice";
import { OrderSteps } from "./OrderSteps";
import { StoreHeader } from "./StoreHeader";
import { BackButton } from "./BackButton";
import { selectShippingData } from "../store/orderForm.selectors";
import { selectShoppingCartItems } from "../store/shoppingCart.selectors";

const { Content } = Layout;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export function OrderPage() {
  const items = useSelector(selectShoppingCartItems);

  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <StoreHeader>
          <BackButton />
        </StoreHeader>
      </Layout>
      <Layout>
        <Content
          style={{
            padding: "20px 30px",
          }}
        >
          {items.length === 0 ? (
            <Alert
              message="Your shopping Cart is empty."
              description="Filling shipping data not possible with empty cart"
              type="error"
              closable
              onClose={() => navigate("/")}
            />
          ) : (
            <>
              <OrderSteps currentStep={1} />
              <Typography.Title>Shipping Data</Typography.Title>
              <OrderForm onClick={() => navigate("/cart/order/summary")} />
            </>
          )}
        </Content>
      </Layout>
    </>
  );
}

function OrderForm({ onClick }) {
  const shippingData = useSelector(selectShippingData);
  const [form] = Form.useForm<ShippingData>();

  const dispatch = useDispatch();

  const onFinish = (values: ShippingData) => {
    console.log("Received values of form: ", values);
    dispatch(orderFormSlice.actions.submit(values));
    onClick();
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="44">+44</Option>
        <Option value="48">+48</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Card>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={shippingData}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="surname"
          label="Surname"
          rules={[
            {
              required: true,
              message: "Please input your surname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: "Please input your city!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="postalCode"
          label="Postal Code"
          rules={[
            {
              required: true,
              message: "Please input your postal code!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="note"
          label="Note"
          tooltip="Additional note for your order"
          rules={[{ required: false, message: "Please input Intro" }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Order
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
