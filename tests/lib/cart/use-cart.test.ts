import { act, renderHook } from "@testing-library/react";
import { useCart } from "@/lib/cart/use-cart";
import type { TenantProduct } from "@/types/product";

const sampleProduct: TenantProduct = {
  id: "prod_a",
  slug: "prod-a",
  whopProductId: "whop_a",
  name: "Sample",
  description: "A sample product",
  priceCents: 2500,
  currency: "USD",
  billingPeriod: "one-time",
};

describe("useCart", () => {
  beforeEach(() => {
    useCart.setState({ items: [] });
  });

  it("adds a product as a new item with quantity 1", () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(sampleProduct));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({
      productId: "prod_a",
      quantity: 1,
      priceCents: 2500,
    });
    expect(result.current.count()).toBe(1);
    expect(result.current.subtotalCents()).toBe(2500);
  });

  it("increments quantity when the same product is added again", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(sampleProduct);
      result.current.addItem(sampleProduct, 2);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it("updateQuantity removes the item when quantity reaches 0", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(sampleProduct, 2);
      result.current.updateQuantity("prod_a", 0);
    });
    expect(result.current.items).toHaveLength(0);
  });

  it("removeItem removes only the targeted product", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(sampleProduct);
      result.current.addItem({ ...sampleProduct, id: "prod_b", slug: "prod-b" });
      result.current.removeItem("prod_a");
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].productId).toBe("prod_b");
  });

  it("clear empties the cart", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(sampleProduct);
      result.current.clear();
    });
    expect(result.current.items).toHaveLength(0);
  });
});
