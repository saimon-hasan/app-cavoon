import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { products } from '../data/catalog';
import { addItem, initialState, restoreState, updateQuantity, type BagItem, type ShopState } from './model';

const STORAGE_KEY = '@caavon/shopping/v1';
interface ShopContextValue {
  state: ShopState; ready: boolean; storageError: string | null;
  add: (item: BagItem) => void; setQuantity: (key: string, quantity: number) => void;
  toggleSaved: (id: string) => void;
}
const ShopContext = createContext<ShopContextValue | null>(null);
export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const writes = useRef(Promise.resolve());
  const changed = useRef(false);
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (active && raw) setState(restoreState(JSON.parse(raw), products));
    }).catch(() => {
      if (active) setStorageError('Your saved bag could not be loaded. You can still shop on this visit.');
    }).finally(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!ready || !changed.current) return;
    // Serialize writes so rapid quantity changes cannot overwrite newer state.
    writes.current = writes.current.then(() => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)))
      .catch(() => setStorageError('Changes are available now, but could not be saved on this device.'));
  }, [state, ready]);
  const value: ShopContextValue = {
    state, ready, storageError,
    add: (item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!ready || !product?.sizes.includes(item.size) || !product.colors.some((c) => c.name === item.color)) return;
      changed.current = true;
      setState((prev) => ({ ...prev, bag: addItem(prev.bag, item) }));
    },
    setQuantity: (key, quantity) => {
      changed.current = true;
      setState((prev) => ({ ...prev, bag: updateQuantity(prev.bag, key, quantity) }));
    },
    toggleSaved: (id) => {
      changed.current = true;
      setState((prev) => ({ ...prev, saved: prev.saved.includes(id)
        ? prev.saved.filter((value) => value !== id) : [...prev.saved, id] }));
    },
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider');
  return context;
}
