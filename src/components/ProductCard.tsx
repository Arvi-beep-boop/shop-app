import { Button, Card, ConfigProvider } from "antd";
import { Product } from "../types/Product";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectIsItemInShoppingCart } from "../store/shoppingCart.selectors";
import { shoppingCartSlice } from "../store/shoppingCart.slice";

interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
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
  return (
    <Card
      hoverable
      style={{ width: 320 }}
      cover={<img src={product.images[0]} />}
    >
      <Card.Meta title={product.title} description={product.price + "$"} />
      <Button variant="solid" color={isInCart ? "green" : undefined} onClick={handleShoppingCartButtonClick} icon={<ShoppingCartOutlined />}></Button>
    </Card>
  );
}
