import { Platform, StyleSheet } from 'react-native';
export const colors = {
  paper: '#F9F8F4', ink: '#182C25', muted: '#747B73', line: '#E1E3DA',
  green: '#234A3C', pale: '#E9EEE7', white: '#FFFFFF', sale: '#9B4F38',
};
export const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' });
export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 22, paddingBottom: 32 },
  eyebrow: { fontSize: 10, letterSpacing: 2.5, fontWeight: '600', color: colors.muted, textTransform: 'uppercase' },
  title: { fontFamily: serif, fontSize: 34, lineHeight: 42, color: colors.ink },
  heading: { fontFamily: serif, fontSize: 26, lineHeight: 33, color: colors.ink },
  body: { fontSize: 14, lineHeight: 23, color: colors.muted },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  rule: { height: 1, backgroundColor: colors.line, marginVertical: 22 },
  chip: { minHeight: 42, paddingHorizontal: 17, paddingVertical: 11, borderRadius: 24, borderWidth: 1, borderColor: colors.line, justifyContent: 'center' },
  chipActive: { backgroundColor: colors.green, borderColor: colors.green },
  chipText: { fontSize: 12, color: colors.ink },
  chipTextActive: { color: colors.white },
});
