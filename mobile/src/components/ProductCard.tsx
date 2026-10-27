import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useShop } from '../state/ShopProvider';
import { money, type Product } from '../state/model';
import { colors, s } from '../theme';
import { IconButton, Photo } from './UI';

export function ProductCard({ product }: { product: Product }) {
  const { state, toggleSaved } = useShop();
  const saved = state.saved.includes(product.id);
  return <View style={styles.card}>
    <View>
      <Pressable accessibilityRole="button" accessibilityLabel={`View ${product.name}`} onPress={() => router.push(`/product/${product.id}`)}>
        <Photo uri={product.images[0]} label={product.name} style={styles.image} />
        {product.isNew && <View style={styles.badge}><Text style={styles.badgeText}>NEW</Text></View>}
      </Pressable>
      <View style={styles.heart}><IconButton icon={saved ? 'heart' : 'heart-outline'} label={`${saved ? 'Unsave' : 'Save'} ${product.name}`} selected={saved} onPress={() => toggleSaved(product.id)} /></View>
    </View>
    <Pressable accessibilityRole="button" accessibilityLabel={`Details for ${product.name}`} onPress={() => router.push(`/product/${product.id}`)} style={{ paddingTop: 12 }}>
      <Text style={styles.category}>{product.category.toUpperCase()}</Text>
      <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
      <View style={[s.row, { gap: 7, flexWrap: 'wrap', marginTop: 5 }]}>
        <Text style={styles.price}>{money(product.price)}</Text>
        {product.originalPrice && <Text style={styles.oldPrice}>{money(product.originalPrice)}</Text>}
      </View>
      <View style={[s.row, { gap: 5, marginTop: 9 }]}>{product.colors.slice(0, 4).map((color) => <View key={color.name} style={[styles.swatch, { backgroundColor: color.hex }]} />)}</View>
    </Pressable>
  </View>;
}
const styles = StyleSheet.create({
  card: { flex: 1 }, image: { width: '100%', aspectRatio: 0.76 },
  badge: { position: 'absolute', top: 10, left: 10, backgroundColor: colors.paper, paddingHorizontal: 8, paddingVertical: 5 },
  badgeText: { fontSize: 8, letterSpacing: 1, color: colors.ink },
  heart: { position: 'absolute', bottom: 8, right: 8, backgroundColor: colors.paper, borderRadius: 24 },
  category: { fontSize: 8, letterSpacing: 1.5, color: colors.muted, marginBottom: 5 },
  name: { color: colors.ink, fontSize: 13, lineHeight: 19, fontWeight: '500' },
  price: { fontSize: 12, color: colors.ink }, oldPrice: { fontSize: 11, textDecorationLine: 'line-through', color: colors.muted },
  swatch: { width: 9, height: 9, borderRadius: 5, borderWidth: 0.5, borderColor: '#BFC3BA' },
});
