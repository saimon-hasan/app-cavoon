import { FlatList, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useShop } from '../../state/ShopProvider';
import { products } from '../../data/catalog';
import { ProductCard } from '../../components/ProductCard';
import { Button, Empty } from '../../components/UI';
import { s } from '../../theme';
export default function Saved() {
  const { state } = useShop();
  const saved = products.filter((p) => state.saved.includes(p.id));
  return <FlatList style={s.screen} data={saved} keyExtractor={(p) => p.id} numColumns={2}
    contentContainerStyle={s.content} columnWrapperStyle={{ gap: 14 }}
    ListHeaderComponent={<View style={{ marginBottom: 24 }}><Text style={s.eyebrow}>YOUR PERSONAL EDIT</Text><Text style={[s.title, { marginTop: 8 }]}>Keep a little inspiration.</Text><Text style={[s.body, { marginTop: 10 }]}>The pieces you love, all in one place.</Text></View>}
    renderItem={({ item }) => <View style={{ width: '48%', marginBottom: 25 }}><ProductCard product={item} /></View>}
    ListEmptyComponent={<Empty icon="heart-outline" title="Something will catch your eye." description="Tap the heart on any piece to save it here for later."><Button title="Explore the collection" onPress={() => router.navigate('/shop')} /></Empty>}
  />;
}
