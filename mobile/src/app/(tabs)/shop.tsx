import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { products, categories } from '../../data/catalog';
import { ProductCard } from '../../components/ProductCard';
import { Button, Empty, IconButton } from '../../components/UI';
import { colors, s } from '../../theme';

export default function Shop() {
  const params = useLocalSearchParams<{ gender?: string }>();
  const gender = ['women', 'men'].includes(params.gender ?? '') ? params.gender! : 'all';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<'featured' | 'low' | 'high'>('featured');
  const filtered = useMemo(() => {
    const result = products.filter((p) => (gender === 'all' || p.gender === gender)
      && (category === 'All' || p.category === category)
      && `${p.name} ${p.category} ${p.material}`.toLowerCase().includes(query.trim().toLowerCase()));
    return sort === 'featured' ? result : result.sort((a, b) => sort === 'low' ? a.price - b.price : b.price - a.price);
  }, [gender, query, category, sort]);
  const reset = () => { setQuery(''); setCategory('All'); setSort('featured'); router.setParams({ gender: 'all' }); };
  return <View style={s.screen}>
    <FlatList data={filtered} keyExtractor={(p) => p.id} numColumns={2} showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 22, paddingBottom: 32 }} columnWrapperStyle={{ gap: 14 }}
      renderItem={({ item }) => <View style={{ width: '48%', marginBottom: 25 }}><ProductCard product={item} /></View>}
      ListHeaderComponent={<View>
        <Text style={s.eyebrow}>THE COLLECTION</Text><Text style={[s.title, { marginTop: 8, marginBottom: 18 }]}>Everyday, elevated.</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.line, paddingLeft: 14, marginBottom: 18 }}>
          <Ionicons name="search-outline" size={20} color={colors.muted} />
          <TextInput accessibilityLabel="Search products" placeholder="Find your next favorite" placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} autoCorrect={false} returnKeyType="search" style={{ flex: 1, minHeight: 48, paddingHorizontal: 12, color: colors.ink, fontSize: 13 }} />
          {!!query && <IconButton icon="close" label="Clear search" onPress={() => setQuery('')} />}
        </View>
        <View style={[s.row, { gap: 26, marginBottom: 18 }]}>{['all', 'women', 'men'].map((value) => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: gender === value }} onPress={() => router.setParams({ gender: value })} style={{ paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: gender === value ? colors.green : 'transparent' }}><Text style={{ fontSize: 14, color: gender === value ? colors.ink : colors.muted, textTransform: 'capitalize' }}>{value === 'all' ? 'All pieces' : value}</Text></Pressable>)}</View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 18 }}>{categories.map((value) => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: category === value }} onPress={() => setCategory(value)} style={[s.chip, category === value && s.chipActive]}><Text style={[s.chipText, category === value && s.chipTextActive]}>{value}</Text></Pressable>)}</ScrollView>
        <View style={[s.between, { marginBottom: 16 }]}><Text style={[s.body, { fontSize: 11 }]}>{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Change product sort order" onPress={() => setSort(sort === 'featured' ? 'low' : sort === 'low' ? 'high' : 'featured')} style={[s.row, { minHeight: 44, gap: 6 }]}><Text style={{ fontSize: 11, color: colors.ink }}>{sort === 'featured' ? 'Featured' : sort === 'low' ? 'Price: low to high' : 'Price: high to low'}</Text><Ionicons name="swap-vertical" size={14} color={colors.ink} /></Pressable>
        </View>
      </View>}
      ListEmptyComponent={<Empty icon="search-outline" title="Nothing here just yet." description="Try another search or clear your filters to explore the whole collection."><Button title="Clear filters" onPress={reset} /></Empty>}
    />
  </View>;
}
