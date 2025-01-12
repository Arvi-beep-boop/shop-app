import { Route, Routes } from "react-router";
import { ProductListPage } from "./components/ProductListPage";
import { ShoppingCartPage } from "./components/ShoppingCartPage";
import { OrderPage } from "./components/OrderPage";
import { SummaryPage } from "./components/SummaryPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/cart/order" element={<OrderPage />} />
      <Route path="/cart/order/summary" element={<SummaryPage />} />
    </Routes>
  );
}
