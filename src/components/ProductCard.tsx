import { Button, Card, ConfigProvider, Typography } from "antd";
import { Product } from "../types/Product";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectIsItemInShoppingCart } from "../store/shoppingCart.selectors";
import { shoppingCartSlice } from "../store/shoppingCart.slice";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState<Boolean>(false);

  const isInCart = useSelector((state) =>
    selectIsItemInShoppingCart(state, product.id)
  );
  const dispatch = useDispatch();

  const handleShoppingCartButtonClick = () => {
    if (isInCart) {
      dispatch(shoppingCartSlice.actions.remove(product.id));
    } else {
      dispatch(shoppingCartSlice.actions.add(product));
    }
  };

  const handleHover = () => {
    setIsHovering(!isHovering);
  };
  return (
    <Card
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      hoverable
      style={{ width: 320 }}
      cover={<img src={product.images[isHovering ? 1 : 0]} />}
      actions={[
        <Button
          variant="solid"
          color={isInCart ? "green" : undefined}
          onClick={handleShoppingCartButtonClick}
          icon={<ShoppingCartOutlined />}
        >
          {isInCart ? "Remove from" : "Add to"} the shopping cart
        </Button>,
      ]}
    >
      <Card.Meta title={product.title} description={<Typography>{`$${product.price}`}</Typography>} />
    </Card>
  );
}
