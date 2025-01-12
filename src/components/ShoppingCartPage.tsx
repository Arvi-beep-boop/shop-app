import { Avatar, Button, Divider, Layout, List, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectShoppingCartItems } from "../store/shoppingCart.selectors";
import { DeleteOutlined } from "@ant-design/icons";
import { shoppingCartSlice } from "../store/shoppingCart.slice";

const { Header, Footer, Sider, Content } = Layout;
const shippingPrice = 5.99;

export function ShoppingCartPage() {
  const items = useSelector(selectShoppingCartItems);
  const totalPrice = items.reduce((total, item) => {
    return total + item.price;
  }, 0);

  const dispatch = useDispatch();

  const handleDeleteClick = (productId) => {
    dispatch(shoppingCartSlice.actions.remove(productId));
  };

  return (
    <>
      <Layout>
        <Header>header</Header>
        <Layout>
          <Content>
            <List
              rootClassName="padding-normal"
              dataSource={items}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <>
                      ${item.price}{" "}
                      <Button
                        onClick={() => handleDeleteClick(item.id)}
                        icon={<DeleteOutlined />}
                      ></Button>
                    </>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar shape="square" src={item.images[0]} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            ></List>
          </Content>
          <Sider theme="light">
            <Typography.Title level={4}>Products price: ${totalPrice}</Typography.Title>
            <Typography.Title level={4}>Shipping: ${shippingPrice}</Typography.Title>
            <Divider/>
            <Typography.Title level={2}>Total: ${totalPrice + shippingPrice}</Typography.Title>
          </Sider>
        </Layout>
      </Layout>

    </>
  );
}
