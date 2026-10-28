import { ScrollView, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useShop } from '../../state/ShopProvider';
import { products } from '../../data/catalog';
import { itemKey, money, subtotal } from '../../state/model';
import { Button, Empty, IconButton, Photo } from '../../components/UI';
import { colors, s } from '../../theme';
export default function Bag() {
  const { state, setQuantity } = useShop();
  const count = state.bag.reduce((sum, item) => sum + item.quantity, 0);
  return <ScrollView style={s.screen} contentContainerStyle={s.content}>
    <Text style={s.eyebrow}>CHOSEN BY YOU</Text><Text style={[s.title, { marginTop: 8 }]}>Your bag.</Text>
    <Text style={[s.body, { marginTop: 8, marginBottom: 24 }]}>{count} {count === 1 ? 'piece' : 'pieces'} · Saved on this device</Text>
    {!state.bag.length ? <Empty icon="bag-outline" title="Make room for a new favorite." description="Your next everyday essential is waiting in the collection."><Button title="Start exploring" onPress={() => router.navigate('/shop')} /></Empty> : <>
      {state.bag.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        const key = itemKey(item);
        return <View key={key} style={{ borderBottomWidth: 1, borderColor: colors.line, paddingBottom: 22, marginBottom: 22 }}>
          <View style={[s.row, { alignItems: 'flex-start' }]}>
            <Pressable accessibilityRole="button" accessibilityLabel={`View ${product.name}`} onPress={() => router.push(`/product/${product.id}`)}><Photo uri={product.images[0]} label={product.name} style={{ width: 94, height: 123 }} /></Pressable>
            <View style={{ flex: 1 }}><Text style={{ color: colors.ink, fontSize: 14, lineHeight: 21 }}>{product.name}</Text><Text style={[s.body, { fontSize: 11, marginTop: 5 }]}>{item.color} / {item.size}</Text>
              <Text style={{ color: colors.ink, fontSize: 13, marginTop: 8 }}>{money(product.price * item.quantity)}</Text>
              <View style={[s.between, { marginTop: 6 }]}><View style={[s.row, { gap: 0 }]}>
                <IconButton icon="remove" label={`Decrease quantity of ${product.name}`} onPress={() => setQuantity(key, item.quantity - 1)} /><Text accessibilityLabel={`Quantity ${item.quantity}`} style={{ color: colors.ink, minWidth: 18, textAlign: 'center' }}>{item.quantity}</Text>
                <Pressable accessibilityRole="button" accessibilityLabel={`Increase quantity of ${product.name}`} disabled={item.quantity >= 10} accessibilityState={{ disabled: item.quantity >= 10 }} onPress={() => setQuantity(key, item.quantity + 1)} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', opacity: item.quantity >= 10 ? 0.3 : 1 }}><Text style={{ fontSize: 22, color: colors.ink }}>+</Text></Pressable>
              </View><IconButton icon="trash-outline" label={`Remove ${product.name}`} onPress={() => setQuantity(key, 0)} /></View>
            </View>
          </View>
        </View>;
      })}
      <View style={s.between}><Text style={{ color: colors.ink, fontSize: 15 }}>Subtotal</Text><Text style={{ color: colors.ink, fontSize: 20 }}>{money(subtotal(state.bag, products))}</Text></View>
      <Text style={[s.body, { fontSize: 11, marginTop: 10, marginBottom: 22 }]}>USD · Shipping and taxes are not included. This preview does not accept payments or place orders.</Text>
      <Button title="Review your selections" onPress={() => router.push('/review')} />
      <View style={{ marginTop: 12 }}><Button title="Continue exploring" secondary onPress={() => router.navigate('/shop')} /></View>
    </>}
  </ScrollView>;
}
