import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../../data/catalog';
import { Photo, Button } from '../../components/UI';
import { ProductCard } from '../../components/ProductCard';
import { colors, s, serif } from '../../theme';

export default function Discover() {
  const shop = (gender: string = 'all') => router.navigate({ pathname: '/shop', params: { gender } });
  return <ScrollView style={s.screen} contentContainerStyle={{ paddingBottom: 26 }} showsVerticalScrollIndicator={false}>
    <View style={styles.note}><View style={styles.dot} /><Text style={styles.noteText}>THE EVERYDAY COLLECTION</Text><Text style={styles.noteText}>01 / CAAVON</Text></View>
    <View style={styles.hero}>
      <Photo uri={products[0].images[0]} label="The everyday clothing collection" style={StyleSheet.absoluteFill} />
      <LinearGradient colors={['transparent', 'rgba(15,29,23,0.84)']} style={StyleSheet.absoluteFill} />
      <View style={styles.heroContent}><Text style={styles.heroKicker}>LESS, BUT BETTER.</Text>
        <Text style={styles.heroTitle}>Your everyday.{ '\n' }Reimagined.</Text>
        <Text style={styles.heroDescription}>Considered pieces. A little more you.</Text>
        <Pressable accessibilityRole="button" onPress={() => shop()} style={styles.heroButton}><Text style={styles.heroButtonText}>Explore the collection</Text><Ionicons name="arrow-forward" size={18} color={colors.ink} /></Pressable>
      </View>
      <Text style={styles.heroNumber}>THE CAAVON EDIT</Text>
    </View>
    <View style={s.content}>
      <View style={[s.between, { marginBottom: 20 }]}><Text style={s.heading}>Find your perspective.</Text></View>
      <View style={s.row}>
        {[{ title: 'Women', image: products[2].images[0], gender: 'women' }, { title: 'Men', image: products[8].images[0], gender: 'men' }].map((collection) =>
          <Pressable key={collection.gender} accessibilityRole="button" accessibilityLabel={`Shop ${collection.title}`} onPress={() => shop(collection.gender)} style={styles.collection}>
            <Photo uri={collection.image} label={collection.title} style={{ width: '100%', aspectRatio: 0.95 }} />
            <View style={[s.between, { paddingTop: 10 }]}><Text style={styles.collectionText}>{collection.title}</Text><Ionicons name="arrow-forward" size={17} color={colors.ink} /></View>
          </Pressable>)}
      </View>
      <View style={s.rule} />
      <View style={[s.between, { marginBottom: 19 }]}><View><Text style={[s.eyebrow, { marginBottom: 7 }]}>THE CURRENT EDIT</Text><Text style={s.heading}>Worth a closer look.</Text></View>
        <Pressable accessibilityRole="button" onPress={() => shop()} style={{ padding: 8 }}><Text style={{ color: colors.green, fontSize: 12 }}>View all ↗</Text></Pressable></View>
      <View style={[s.row, { alignItems: 'flex-start' }]}><ProductCard product={products[0]} /><ProductCard product={products[8]} /></View>
      <View style={styles.brandStory}><Text style={s.eyebrow}>THE CAAVON WAY</Text><Text style={[s.heading, { marginVertical: 12 }]}>Room for what matters.</Text><Text style={s.body}>A simpler way to discover your next everyday favorite. Explore the collection, save what speaks to you, and come back when you’re ready.</Text><View style={{ marginTop: 20 }}><Button title="Meet CAAVON" secondary onPress={() => router.push('/about')} /></View></View>
      <Text style={styles.sample}>CAPSTONE PREVIEW · SAMPLE COLLECTION</Text>
    </View>
  </ScrollView>;
}
const styles = StyleSheet.create({
  note: { paddingHorizontal: 22, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 8 },
  noteText: { fontSize: 8, letterSpacing: 1.3, color: colors.muted, flex: 1 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.green },
  hero: { height: 410, marginHorizontal: 14, backgroundColor: colors.green, overflow: 'hidden' },
  heroContent: { position: 'absolute', left: 24, right: 24, bottom: 25 },
  heroKicker: { color: '#F1EEDC', fontSize: 9, letterSpacing: 2.4, marginBottom: 12 },
  heroTitle: { color: colors.white, fontSize: 44, lineHeight: 48, fontFamily: serif },
  heroDescription: { color: '#E0E7DF', fontSize: 12, marginTop: 12, marginBottom: 22 },
  heroButton: { minHeight: 49, backgroundColor: colors.paper, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  heroButtonText: { fontSize: 12, fontWeight: '600', color: colors.ink },
  heroNumber: { position: 'absolute', top: 20, left: 24, color: colors.white, fontSize: 9, letterSpacing: 2 },
  collection: { flex: 1 }, collectionText: { fontFamily: serif, fontSize: 21, color: colors.ink },
  brandStory: { marginTop: 32, backgroundColor: colors.pale, padding: 24 },
  sample: { fontSize: 8, letterSpacing: 1.4, color: colors.muted, textAlign: 'center', marginTop: 28 },
});
