export default function RootRedirect() {
  if (typeof window !== 'undefined') {
    window.location.replace('/es');
  }
  return null;
}
