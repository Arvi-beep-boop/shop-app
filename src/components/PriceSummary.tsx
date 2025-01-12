import { Card, Divider, Flex, Row, Typography } from "antd";

export function PriceSummary({ totalPrice, shippingPrice, button }) {
  return (
    <>
      <Card actions={[button]}>
        <Flex justify="space-between" align="baseline">
          <Typography.Title level={4}>Products price:</Typography.Title>
          <Typography.Title level={4}>${totalPrice}</Typography.Title>
        </Flex>
        <Flex justify="space-between" align="baseline">
        
          <Typography.Title level={4}>Shipping:</Typography.Title>
          <Typography.Title level={4}>${shippingPrice}</Typography.Title>
        </Flex>
        <Divider />
        <Flex justify="space-between" align="baseline">
          <Typography.Title level={2}>Total:</Typography.Title>
          <Typography.Title level={2}>
            ${totalPrice + shippingPrice}
          </Typography.Title>
        </Flex>
      </Card>
    </>
  );
}
