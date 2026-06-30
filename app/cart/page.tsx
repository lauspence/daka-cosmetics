import CartView from "@/components/CartView";
import { isMpesaConfigured } from "@/lib/mpesa";

export default function CartPage() {
  return <CartView mpesaEnabled={isMpesaConfigured()} />;
}
