import {
  Alert,
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Layout,
  Typography,
} from "antd";
import { ListProductInCart } from "./ListProductInCart";
import { selectShippingData } from "../store/orderForm.selectors";
import { useSelector } from "react-redux";
import { PriceSummary } from "./PriceSummary";
import {
  selectShoppingCartItems,
  selectTotalPriceShoppingCart,
} from "../store/shoppingCart.selectors";
import { shippingPrice } from "../constants";
import { OrderSteps } from "./OrderSteps";
import { StoreHeader } from "./StoreHeader";
import { BackButton } from "./BackButton";
import { useNavigate } from "react-router";
const { Sider, Content } = Layout;

export function SummaryPage() {
  const shippingData = useSelector(selectShippingData);
  const totalPrice = useSelector(selectTotalPriceShoppingCart);
  const boughtProducts = useSelector(selectShoppingCartItems);
  const navigate = useNavigate();
  const items: DescriptionsProps["items"] = shippingData
    ? [
        {
          key: "name",
          label: "Name",
          children: shippingData.name,
        },
        {
          key: "surname",
          label: "Surname",
          children: shippingData.surname,
        },
        {
          key: "city",
          label: "City",
          children: shippingData.city,
        },
        {
          key: "postalCode",
          label: "Postal Code",
          children: shippingData.postalCode,
        },
        {
          key: "address",
          label: "Address",
          children: shippingData.address,
        },
        {
          key: "email",
          label: "E-mail",
          children: shippingData.email,
        },
        {
          key: "phone",
          label: "Phone Number",
          children: shippingData.phone,
        },
        {
          key: "note",
          label: "Note",
          children: shippingData.note,
        },
      ]
    : [];
  return (
    <>
      <Layout>
        <StoreHeader>
          <BackButton />
        </StoreHeader>
      </Layout>
      {boughtProducts.length === 0 || shippingData === null ? (
        <Alert
          message="Completing your order is not possible"
          description="Your shopping cart is empty or the shipping data is not filled"
          type="error"
          closable
          onClose={() => navigate("/")}
        />
      ) : (
        <Layout>
          <Content
            style={{
              padding: "20px 30px",
            }}
          >
            <OrderSteps currentStep={2} />
            <Typography.Title level={2}>Ordered Products</Typography.Title>
            <Card>
              <ListProductInCart showDeleteButton={false} />
            </Card>
            <Typography.Title level={2}>Shipping Data</Typography.Title>
            <Card>
              <Descriptions bordered items={items}></Descriptions>
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
                  type="primary"
                  onClick={() => {
                    alert("Thank you for shopping with us!");
                  }}
                >
                  Confirm order
                </Button>
              }
            />
          </Sider>
        </Layout>
      )}
    </>
  );
}
