import "../App.css";
import logo from "../assets/logo.png";
import { useMemo, useState } from "react";
import {
  Button,
  Flex,
  Layout,
  Input,
  Dropdown,
  Space,
  Alert,
  Spin,
} from "antd";
import {
  DownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { GetProps } from "antd";
import { storeApi } from "../api/api.slice";
import { CategoryList } from "./CategoryList";
import { CurrentCategory } from "./CurrentCategory";
import { ProductCard } from "./ProductCard";
import { Link, useNavigate } from "react-router";
import { ProductQueryParams } from "../types/ProductQueryParams";
import { StoreHeader } from "./StoreHeader";
const { Search } = Input;
const { Footer, Sider, Content } = Layout;

type SearchProps = GetProps<typeof Input.Search>;

const items: MenuProps["items"] = [
  {
    label: "Price: Low-High",
    key: "price-ASC",
    icon: <UserOutlined />,
  },
  {
    label: "Price: High-Low",
    key: "price-DESC",
    icon: <UserOutlined />,
  },
];

export function ProductListPage() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<number | undefined>();
  const [selectedSort, setSelectedSort] = useState<string | undefined>();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    setSelectedSort(e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setSearch(value);
    console.log(info?.source, value);
  };

  const [order_by, order] = useMemo(
    () => selectedSort?.split("-") || [],
    [selectedSort]
  );
  const { data: products, error, isFetching } = storeApi.useGetProductsQuery({
    title: search,
    categoryId: category,
    order_by: order_by,
    order: order as ProductQueryParams["order"],
  });

  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <StoreHeader>
          <img src={logo} height={40} />
          <Search
            size="large"
            placeholder="Search"
            onSearch={onSearch}
            enterButton
            style={{
              marginLeft: "70px",
            }}
          />
          <Button
            size="large"
            color="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate("/cart")}
          ></Button>
        </StoreHeader>
        <Layout>
          <Sider theme="light">
            <CategoryList onSelect={setCategory} />
          </Sider>
          <Content>
            <CurrentCategory categoryId={category} />
            <Flex
              justify="space-between"
              align="center"
              rootClassName="padding-normal"
            >
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    Sort
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <div>Product Count: {products?.length}</div>
            </Flex>
            {error ? (
              <Alert message="Something went wrong" type="error" />
            ) : (
              <Spin spinning={isFetching}>
                <Flex
                  wrap
                  gap="large"
                  rootClassName="padding-normal"
                  justify="center"
                >
                  {products?.map((product) => {
                    return <ProductCard product={product}></ProductCard>;
                  })}
                </Flex>
              </Spin>
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
