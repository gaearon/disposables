export default function isDisposable(obj) {
  return Boolean(obj && typeof obj.dispose === 'function');
}