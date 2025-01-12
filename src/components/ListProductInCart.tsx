import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectShoppingCartItems } from "../store/shoppingCart.selectors";
import { shoppingCartSlice } from "../store/shoppingCart.slice";

export function ListProductInCart({showDeleteButton}) {
  const items = useSelector(selectShoppingCartItems);
  const dispatch = useDispatch();

  const handleDeleteClick = (productId) => {
    dispatch(shoppingCartSlice.actions.remove(productId));
  };
  return (
    <List
      rootClassName="padding-normal"
      dataSource={items}
      renderItem={(item) => (
        <List.Item
          extra={
            <Space style={{
              marginLeft: '20px'
            }}>
              {`$${item.price}`}
              {showDeleteButton && 
              <Button
                onClick={() => handleDeleteClick(item.id)}
                icon={<DeleteOutlined />}
              ></Button>}
            </Space>
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
  );
}
