import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useShop } from '../state/ShopProvider';
import { itemKey, money, subtotal } from '../state/model';
import { products } from '../data/catalog';
import { Button, IconButton } from '../components/UI';
import { colors, s } from '../theme';
export default function Review() {
  const { state } = useShop();
  return <SafeAreaView style={s.screen}><View style={[s.between, { paddingHorizontal: 12 }]}><IconButton icon="close" label="Close bag review" onPress={() => router.canGoBack() ? router.back() : router.replace('/bag')} /><Text style={s.eyebrow}>YOUR SELECTIONS</Text><View style={{ width: 44 }} /></View>
    <ScrollView contentContainerStyle={s.content}><Text style={[s.title, { marginVertical: 18 }]}>A little more you.</Text>
      <Text style={s.body}>Your bag is ready for you to revisit. No order has been placed.</Text><View style={s.rule} />
      {state.bag.map((item) => { const product = products.find((p) => p.id === item.productId)!; return <View key={itemKey(item)} style={{ marginBottom: 24 }}><Text style={{ color: colors.ink, fontSize: 15 }}>{product.name}</Text><View style={s.between}><Text style={[s.body, { fontSize: 12 }]}>{item.color} / {item.size} × {item.quantity}</Text><Text style={{ color: colors.ink }}>{money(product.price * item.quantity)}</Text></View></View>; })}
      <View style={s.rule} /><View style={s.between}><Text style={s.heading}>Subtotal</Text><Text style={s.heading}>{money(subtotal(state.bag, products))}</Text></View>
      <Text style={[s.body, { fontSize: 12, marginTop: 16, marginBottom: 24 }]}>USD. Taxes and shipping are not included. Checkout will be added in a future version.</Text>
      <Button title="Back to your bag" onPress={() => router.navigate('/bag')} />
    </ScrollView>
  </SafeAreaView>;
}
