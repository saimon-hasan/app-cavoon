import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { products } from '../../data/catalog';
import { Button, Empty, IconButton, Photo } from '../../components/UI';
import { useShop } from '../../state/ShopProvider';
import { itemKey, money } from '../../state/model';
import { colors, s } from '../../theme';

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { state, toggleSaved, add } = useShop();
  const [size, setSize] = useState('');
  const [colorIndex, setColorIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [added, setAdded] = useState(false);
  const back = () => router.canGoBack() ? router.back() : router.replace('/shop');
  if (!product) return <SafeAreaView style={s.screen}><Empty icon="shirt-outline" title="Piece not found." description="This item is not in the current collection."><Button title="Back to the collection" onPress={() => router.replace('/shop')} /></Empty></SafeAreaView>;
  const color = product.colors[colorIndex];
  const selectedKey = itemKey({ productId: product.id, color: color.name, size });
  const atLimit = (state.bag.find((item) => itemKey(item) === selectedKey)?.quantity ?? 0) >= 10;
  const save = state.saved.includes(product.id);
  function addToBag() {
    if (!size) { setMessage('Choose a size to add this piece to your bag.'); return; }
    if (!product || atLimit) return;
    add({ productId: product.id, size, color: color.name, quantity: 1 });
    setMessage('Added to your bag.'); setAdded(true);
  }
  return <SafeAreaView style={s.screen} edges={['top', 'bottom', 'left', 'right']}>
    <View style={[s.between, { paddingHorizontal: 12, paddingVertical: 5 }]}><IconButton icon="arrow-back" label="Back to collection" onPress={back} /><Text style={s.eyebrow}>THE DETAILS</Text><IconButton icon={save ? 'heart' : 'heart-outline'} label={save ? `Unsave ${product.name}` : `Save ${product.name}`} selected={save} onPress={() => toggleSaved(product.id)} /></View>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }}>
      <Photo uri={product.images[imageIndex]} label={product.name} style={{ width: '100%', aspectRatio: 0.92 }} />
      {product.images.length > 1 && <View style={[s.row, { justifyContent: 'center', gap: 0 }]}>{product.images.map((_, i) => <Pressable accessibilityRole="button" accessibilityLabel={`View photo ${i + 1}`} accessibilityState={{ selected: i === imageIndex }} key={i} onPress={() => setImageIndex(i)} style={{ width: 44, height: 38, alignItems: 'center', justifyContent: 'center' }}><View style={{ height: 5, width: i === imageIndex ? 22 : 5, borderRadius: 4, backgroundColor: i === imageIndex ? colors.green : colors.line }} /></Pressable>)}</View>}
      <View style={s.content}>
        <Text style={s.eyebrow}>{product.gender} / {product.category}</Text>
        <Text style={[s.title, { fontSize: 30, lineHeight: 36, marginTop: 9 }]}>{product.name}</Text>
        <View style={[s.row, { marginTop: 12 }]}><Text style={{ fontSize: 19, color: colors.ink }}>{money(product.price)}</Text>{product.originalPrice && <Text style={{ fontSize: 14, textDecorationLine: 'line-through', color: colors.muted }}>{money(product.originalPrice)}</Text>}<Text style={[s.eyebrow, { fontSize: 8 }]}>USD</Text></View>
        <View style={s.rule} />
        <Text style={{ color: colors.ink, fontSize: 12 }}>Color · {color.name}</Text>
        <View style={[s.row, { marginTop: 10, gap: 5, flexWrap: 'wrap' }]}>{product.colors.map((value, i) => <Pressable key={value.name} accessibilityRole="button" accessibilityLabel={`Color ${value.name}`} accessibilityState={{ selected: i === colorIndex }} onPress={() => { setColorIndex(i); setAdded(false); setMessage(''); }} style={{ padding: 6, borderRadius: 24, borderWidth: 1, borderColor: i === colorIndex ? colors.ink : 'transparent' }}><View style={{ width: 30, height: 30, borderRadius: 16, backgroundColor: value.hex, borderWidth: 1, borderColor: '#CDD0C6' }} /></Pressable>)}</View>
        <Text style={{ color: colors.ink, fontSize: 12, marginTop: 24, marginBottom: 12 }}>Size · {size || 'Choose your fit'}</Text>
        <View style={[s.row, { flexWrap: 'wrap', gap: 8 }]}>{product.sizes.map((value) => <Pressable key={value} accessibilityRole="button" accessibilityLabel={`Size ${value}`} accessibilityState={{ selected: size === value }} onPress={() => { setSize(value); setAdded(false); setMessage(''); }} style={{ minWidth: 46, minHeight: 46, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: size === value ? colors.green : colors.line, backgroundColor: size === value ? colors.green : 'transparent' }}><Text style={{ fontSize: 12, color: size === value ? colors.white : colors.ink }}>{value}</Text></Pressable>)}</View>
        <View style={s.rule} /><Text style={[s.heading, { fontSize: 23 }]}>Made for your everyday.</Text><Text style={[s.body, { marginTop: 12 }]}>{product.description}</Text>
        <Text style={{ color: colors.ink, fontSize: 12, marginTop: 22, marginBottom: 8 }}>MATERIAL & CARE</Text><Text style={s.body}>{product.material}</Text>{product.care.map((line) => <Text key={line} style={[s.body, { fontSize: 12 }]}>· {line}</Text>)}
      </View>
    </ScrollView>
    <View style={{ paddingHorizontal: 22, paddingTop: 12, paddingBottom: 12, borderTopWidth: 1, borderTopColor: colors.line }}>
      {!!message && <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={{ fontSize: 12, color: added ? colors.green : colors.sale, paddingBottom: 10 }}>{message}</Text>}
      {added ? <View style={s.row}><View style={{ flex: 1 }}><Button title="View bag" onPress={() => router.navigate('/bag')} /></View><IconButton icon="add" label="Add another of this item" onPress={() => { setAdded(false); setMessage(''); }} /></View>
        : <Button title={atLimit ? 'Limit reached: 10 per selection' : `Add to bag · ${money(product.price)}`} disabled={atLimit} onPress={addToBag} />}
    </View>
  </SafeAreaView>;
}
