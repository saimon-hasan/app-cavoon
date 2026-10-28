export interface Product {
  id: string; name: string; gender: string; category: string; price: number;
  originalPrice: number | null; isNew: boolean; isSale: boolean;
  description: string; material: string; care: string[];
  colors: { name: string; hex: string }[]; images: string[]; sizes: string[]; relatedIds: string[];
}
export interface BagItem { productId: string; size: string; color: string; quantity: number }
export interface ShopState { version: 1; bag: BagItem[]; saved: string[] }
export const initialState: ShopState = { version: 1, bag: [], saved: [] };
export const itemKey = (item: Pick<BagItem, 'productId' | 'size' | 'color'>) =>
  JSON.stringify([item.productId, item.size, item.color]);
export const money = (value: number) => `$${value.toFixed(2)}`;

export function addItem(bag: BagItem[], item: BagItem): BagItem[] {
  const existing = bag.find((row) => itemKey(row) === itemKey(item));
  if (!existing) return [...bag, { ...item, quantity: Math.min(10, Math.max(1, item.quantity)) }];
  return bag.map((row) => itemKey(row) === itemKey(item)
    ? { ...row, quantity: Math.min(10, row.quantity + item.quantity) } : row);
}
export function updateQuantity(bag: BagItem[], key: string, quantity: number): BagItem[] {
  if (quantity <= 0) return bag.filter((row) => itemKey(row) !== key);
  return bag.map((row) => itemKey(row) === key ? { ...row, quantity: Math.min(10, Math.floor(quantity)) } : row);
}
export function subtotal(bag: BagItem[], products: Product[]): number {
  return bag.reduce((cents, row) => {
    const product = products.find((p) => p.id === row.productId);
    return cents + Math.round((product?.price ?? 0) * 100) * row.quantity;
  }, 0) / 100;
}

// Stored device data is untrusted: ignore missing products and invalid variants.
export function restoreState(raw: unknown, products: Product[]): ShopState {
  if (!raw || typeof raw !== 'object' || !('version' in raw) || raw.version !== 1) return initialState;
  const value = raw as Partial<ShopState>;
  let bag: BagItem[] = [];
  if (Array.isArray(value.bag)) {
    for (const row of value.bag) {
      if (!row || typeof row !== 'object') continue;
      const product = products.find((p) => p.id === row.productId);
      if (!product || !product.sizes.includes(row.size) || !product.colors.some((c) => c.name === row.color)
        || !Number.isInteger(row.quantity) || row.quantity <= 0) continue;
      bag = addItem(bag, row);
    }
  }
  const saved = Array.isArray(value.saved)
    ? [...new Set(value.saved.filter((id) => products.some((p) => p.id === id)))] : [];
  return { version: 1, bag, saved };
}
