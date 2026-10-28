import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { IconButton, Button } from '../components/UI';
import { colors, s } from '../theme';
export default function About() {
  return <SafeAreaView style={s.screen}><View style={[s.between, { paddingHorizontal: 12 }]}><IconButton icon="close" label="Close about" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} /><Text style={s.eyebrow}>OUR PERSPECTIVE</Text><View style={{ width: 44 }} /></View>
    <ScrollView contentContainerStyle={[s.content, { paddingTop: 40 }]}>
      <Text style={s.eyebrow}>CAAVON / PERSPECTIVE</Text><Text style={[s.title, { fontSize: 43, lineHeight: 49, marginTop: 18 }]}>A study in{ '\n' }simplicity.</Text>
      <Text style={[s.body, { marginTop: 24 }]}>A place to discover Perspective clothing and make it your own. Browse, build your personal edit, and keep your favorite pieces close.</Text>
      <View style={s.rule} /><Text style={s.heading}>About this preview</Text>
      <Text style={[s.body, { marginTop: 12 }]}>This is the first CAAVON mobile prototype for CIS 486. It uses a sample collection from the original project. Product images, prices, and descriptions are demonstration content and are not confirmed inventory.</Text>
      <Text style={[s.body, { marginTop: 16 }]}>Your saved pieces and shopping bag stay on this device. There are no accounts, payments, or orders in this version. Photos need an internet connection; the product information is included in the app.</Text>
      <View style={s.rule} /><Text style={s.eyebrow}>THE TEAM</Text><Text style={[s.body, { color: colors.ink, marginTop: 12 }]}>Saimon Hasan{ '\n' }Anthony Guerrero{ '\n' }Sean Clary</Text>
      <View style={{ marginTop: 30 }}><Button title="Explore the collection" onPress={() => router.navigate('/shop')} /></View>
    </ScrollView>
  </SafeAreaView>;
}
