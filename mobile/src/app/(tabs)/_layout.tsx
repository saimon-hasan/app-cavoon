import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShop } from '../../state/ShopProvider';
import { Header } from '../../components/UI';
import { colors, s } from '../../theme';
export default function TabLayout() {
  const { state } = useShop();
  const insets = useSafeAreaInsets();
  const quantity = state.bag.reduce((sum, row) => sum + row.quantity, 0);
  return <SafeAreaView edges={['top', 'left', 'right']} style={s.screen}>
    <Header />
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.green, tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { backgroundColor: colors.paper, borderTopColor: colors.line, height: 76 + insets.bottom, paddingBottom: Math.max(insets.bottom, 8), paddingTop: 8 },
      tabBarIconStyle: { height: 26 }, tabBarLabelStyle: { fontSize: 10, lineHeight: 14, marginTop: 2 }, sceneStyle: { backgroundColor: colors.paper } }}>
      <Tabs.Screen name="index" options={{ title: 'Discover', tabBarAccessibilityLabel: 'Discover', tabBarIcon: ({ size, focused }) => <Ionicons name={focused ? 'compass' : 'compass-outline'} size={size} color={focused ? colors.green : colors.muted} /> }} />
      <Tabs.Screen name="shop" options={{ title: 'Shop', tabBarAccessibilityLabel: 'Shop', tabBarIcon: ({ size, focused }) => <Ionicons name={focused ? 'grid' : 'grid-outline'} size={size} color={focused ? colors.green : colors.muted} /> }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved', tabBarAccessibilityLabel: 'Saved', tabBarIcon: ({ size, focused }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={focused ? colors.green : colors.muted} /> }} />
      <Tabs.Screen name="bag" options={{ title: 'Bag', tabBarAccessibilityLabel: 'Bag', tabBarBadge: quantity || undefined, tabBarBadgeStyle: { backgroundColor: colors.green, fontSize: 10 }, tabBarIcon: ({ size, focused }) => <Ionicons name={focused ? 'bag' : 'bag-outline'} size={size} color={focused ? colors.green : colors.muted} /> }} />
    </Tabs>
  </SafeAreaView>;
}
