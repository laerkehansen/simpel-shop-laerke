// Importerer 'create' fra zustand-biblioteket, som bruges til at oprette en global state (en slags delt data)
import { create } from "zustand";

// Opretter en "store" (en slags delt datahåndtering) til håndtering af en indkøbskurv
const useCartStore = create((set) => ({
  // Initialiserer kurven som et tomt array
  cart: [],

  // Funktion til at tilføje et produkt til kurven
  addToCart: (product) =>
    set((state) => {
      // Tjekker, om produktet allerede findes i kurven
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Hvis produktet allerede er i kurven, opdateres kun mængden (quantity)
        return {
          cart: state.cart.map(
            (item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 } // Forøg mængden med 1
                : item // Hvis det ikke er produktet, behold det uændret
          ),
        };
      } else {
        // Hvis produktet ikke er i kurven, tilføjes det med en startmængde på 1
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),

  // Funktion til at opdatere mængden af et produkt i kurven
  updateCartQuantity: (productId, newQuantity) =>
    set((state) => ({
      cart:
        newQuantity === 0
          ? // Hvis den nye mængde er 0, fjernes produktet fra kurven
            state.cart.filter((product) => product.id !== productId)
          : // Ellers opdateres produktets mængde
            state.cart.map(
              (product) =>
                product.id === productId
                  ? { ...product, quantity: newQuantity } // Opdater produktet med ny mængde, du har lavet noter til "..."
                  : product // Hvis det ikke er produktet, behold det uændret
            ),
    })),

  // Funktion til at tømme hele kurven
  clearCart: () => set({ cart: [] }), // Sætter kurven til en tom liste
}));

// Eksporterer useCartStore, så det kan bruges i andre dele af applikationen
export default useCartStore;
