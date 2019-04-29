export function validUsername(str) {
  const username = ['admin', 'editor']
  return username.indexOf(str.trim()) >= 0
}
