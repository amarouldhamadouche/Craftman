import { MMKV } from "react-native-mmkv"
import { StateStorage } from "zustand/middleware"

const storage = new MMKV()

/** MMKV adapter for Zustand persist middleware. */
export const zustandMMKVStorage: StateStorage = {
  getItem: (name) => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: (name) => storage.delete(name),
}
