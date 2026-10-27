import { useState, type ReactNode } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View, type ViewStyle, type StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, s } from '../theme';

export function IconButton({ icon, label, onPress, selected = false }: {
  icon: React.ComponentProps<typeof Ionicons>['name']; label: string; onPress: () => void; selected?: boolean;
}) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected }}
    onPress={onPress} style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.5 : 1 }]}>
    <Ionicons name={icon} size={22} color={colors.ink} />
  </Pressable>;
}
export function Button({ title, onPress, secondary = false, disabled = false }: {
  title: string; onPress: () => void; secondary?: boolean; disabled?: boolean;
}) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} disabled={disabled} accessibilityState={{ disabled }} onPress={onPress}
    style={({ pressed }) => [styles.button, secondary && styles.secondary, { opacity: disabled ? 0.4 : pressed ? 0.75 : 1 }]}>
    <Text style={[styles.buttonText, secondary && { color: colors.ink }]}>{title}</Text>
    <Ionicons name="arrow-forward" size={18} color={secondary ? colors.ink : colors.white} />
  </Pressable>;
}
export function Header() {
  return <View style={styles.header}>
    <View><Text style={styles.brand}>CAAVON</Text><Text style={styles.brandCaption}>A STUDY IN SIMPLICITY</Text></View>
    <IconButton icon="information-circle-outline" label="About CAAVON" onPress={() => router.push('/about')} />
  </View>;
}
export function Photo({ uri, style, label }: { uri: string; style?: StyleProp<ViewStyle>; label: string }) {
  const [failedUri, setFailedUri] = useState<string | null>(null);
  return <View style={[{ backgroundColor: '#E5E5DC', overflow: 'hidden' }, style]}>
    {failedUri === uri ? <View style={styles.photoFallback}><Ionicons name="shirt-outline" size={36} color={colors.muted} /><Text style={styles.fallbackText}>Image unavailable</Text></View>
      : <Image accessibilityLabel={label} source={{ uri }} style={StyleSheet.absoluteFill} resizeMode="cover" onError={() => setFailedUri(uri)} />}
  </View>;
}
export function Empty({ title, description, icon, children }: {
  title: string; description: string; icon: React.ComponentProps<typeof Ionicons>['name']; children: ReactNode;
}) {
  return <View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name={icon} size={32} color={colors.green} /></View>
    <Text style={[s.heading, { textAlign: 'center' }]}>{title}</Text>
    <Text style={[s.body, { textAlign: 'center', marginVertical: 14 }]}>{description}</Text>
    <View style={{ alignSelf: 'stretch', marginTop: 12 }}>{children}</View>
  </View>;
}
export const styles = StyleSheet.create({
  header: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line },
  brand: { fontSize: 25, letterSpacing: 5, fontWeight: '500', color: colors.ink },
  brandCaption: { fontSize: 7, letterSpacing: 2.6, color: colors.muted, marginTop: 4 },
  iconButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 22 },
  button: { minHeight: 54, paddingHorizontal: 22, paddingVertical: 14, backgroundColor: colors.green, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  buttonText: { fontSize: 13, letterSpacing: 0.5, fontWeight: '600', color: colors.white },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.line },
  photoFallback: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  fallbackText: { fontSize: 11, color: colors.muted, marginTop: 12 },
  empty: { padding: 30, paddingTop: Platform.OS === 'web' ? 70 : 52 },
  emptyIcon: { alignSelf: 'center', padding: 24, backgroundColor: colors.pale, borderRadius: 50, marginBottom: 24 },
});
