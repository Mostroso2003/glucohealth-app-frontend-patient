export function writeToLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function readFromLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key)
  if (!item) return null
  return JSON.parse(item)
}

export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key)
}
