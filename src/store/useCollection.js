import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCollection = create(
  persist(
    (set, get) => ({
      list: [],
      add(pokemon) {
        const exists = get().list.find((x) => x.id === pokemon.id);
        if (exists) return;
        set({ list: [...get().list, pokemon] });
      },
      remove(id) {
        set({ list: get().list.filter((x) => x.id !== id) });
      },
      clear() {
        set({ list: [] });
      },
    }),
    { name: "pokemon-collection" }
  )
);
