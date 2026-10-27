import { ActivityIndicator, Platform, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ShopProvider, useShop } from '../state/ShopProvider';
import { colors } from '../theme';

function Navigation() {
  const { ready, storageError } = useShop();
  if (!ready) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator color={colors.green} accessibilityLabel="Loading your bag" /></View>;
  return <>
    {storageError && <Text accessibilityRole="alert" style={{ padding: 14, backgroundColor: '#FFF0D8', color: colors.ink }}>{storageError}</Text>}
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.paper } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="about" options={{ presentation: 'modal' }} />
      <Stack.Screen name="review" options={{ presentation: 'modal' }} />
    </Stack>
  </>;
}
export default function Layout() {
  return <SafeAreaProvider><ShopProvider>
    <View style={{ flex: 1, backgroundColor: '#E6E8E0', alignItems: 'center' }}>
      <View style={{ flex: 1, width: '100%', maxWidth: Platform.OS === 'web' ? 480 : undefined, backgroundColor: colors.paper }}>
        <StatusBar style="dark" /><Navigation />
      </View>
    </View>
  </ShopProvider></SafeAreaProvider>;
}
