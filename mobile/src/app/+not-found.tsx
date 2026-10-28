import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button, Empty } from '../components/UI';
import { s } from '../theme';
export default function NotFound() {
  return <SafeAreaView style={s.screen}><Empty icon="compass-outline" title="Let’s find your way back." description="This page isn’t part of the collection."><Button title="Explore CAAVON" onPress={() => router.replace('/')} /></Empty></SafeAreaView>;
}
