import React, { useEffect, useState } from "react";
import { getAllProducts } from "./ShopAPI";
import { Button, Divider, Col, Row, Flex, Card } from "antd";
const {Meta} = Card;

interface Product {
  title: string;
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
}
export default function App() {
  const [products, SetProducts] = useState<Product[] | null>(null);

  // replace it with redux toolkit QUERY
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const products = await response.json();
        SetProducts(products);
      } catch (error) {
        console.error("something went wrong");
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <>
      <Flex wrap gap="small">
        {products?.map((product) => {
          return (
            <Card
              style={{ width: 240, height: 240 }}
              cover={<img src={product.image} width="128" height="128" />}
            >
              <Meta title={product.title} description={product.price}/>
            </Card>
          );
        })}
      </Flex>
    </>
  );
}
