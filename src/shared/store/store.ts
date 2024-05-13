import { create } from 'zustand'
import { User } from '../types/user'

interface Store {
  user: User | null
  token: string
  login: (user: User, token: string) => void
  logout: () => void
}

export const useStore = create<Store>()(set => ({
  user: null,
  token: '',
  login: (user, token) => {
    set({ user, token })
  },
  logout: () => {
    set({ user: null, token: '' })
  },
}))
