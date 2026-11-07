import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Address, Order } from '../types';

interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  addresses: Address[];
  orders: Order[];
  login: (phone: string, name?: string) => void;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: Order) => void;
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Pooja Varma',
    phone: '9876543210',
    addressLine1: 'B-402, Royal Palms, Racecourse Road',
    addressLine2: 'Near Jote Circle',
    city: 'Rajkot',
    state: 'Gujarat',
    pincode: '360001',
    isDefault: true,
    type: 'home',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      addresses: DEFAULT_ADDRESSES,
      orders: [],

      login: (phone, name = 'Valued Patron') => {
        set({
          user: {
            id: 'user-' + Date.now(),
            phone,
            name,
            email: 'patron@kripalsilver.com',
          },
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      addAddress: (newAddr) => {
        set((state) => ({
          addresses: [
            ...state.addresses,
            {
              ...newAddr,
              id: 'addr-' + Date.now(),
              isDefault: state.addresses.length === 0 ? true : !!newAddr.isDefault,
            },
          ],
        }));
      },

      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        }));
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },
    }),
    {
      name: 'kripal_auth_store',
    }
  )
);

