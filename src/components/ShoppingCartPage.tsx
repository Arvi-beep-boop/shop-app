import { Button, Card, Layout, Typography } from "antd";
import { useSelector } from "react-redux";
import {
  selectShoppingCartItems,
  selectTotalPriceShoppingCart,
} from "../store/shoppingCart.selectors";
import { useNavigate } from "react-router";
import { ListProductInCart } from "./ListProductInCart";
import { PriceSummary } from "./PriceSummary";
import { shippingPrice } from "../constants";
import { StoreHeader } from "./StoreHeader";
import { LeftOutlined } from "@ant-design/icons";
import { BackButton } from "./BackButton";
import { OrderSteps } from "./OrderSteps";

const { Sider, Content } = Layout;

export function ShoppingCartPage() {
  const totalPrice = useSelector(selectTotalPriceShoppingCart);
  const items = useSelector(selectShoppingCartItems);

  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <StoreHeader>
          <BackButton />
        </StoreHeader>
        <Layout>
          <Content
            style={{
              padding: "20px 30px",
            }}
          >
            <OrderSteps currentStep={0} />
            <Typography.Title>Your cart</Typography.Title>
            <Card>
              <ListProductInCart showDeleteButton={true} />
            </Card>
          </Content>
          <Sider
            width={400}
            theme="light"
            style={{
              padding: "0px 20px",
            }}
          >
            <PriceSummary
              totalPrice={totalPrice}
              shippingPrice={shippingPrice}
              button={
                <Button
                size="large"
                  disabled={items.length === 0}
                  type="primary"
                  onClick={() => navigate("/cart/order")}
                >
                  Shipping and Payment
                </Button>
              }
            />
          </Sider>
        </Layout>
      </Layout>
    </>
  );
}
