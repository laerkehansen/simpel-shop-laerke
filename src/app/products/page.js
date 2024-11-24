//i denne page fetcher vi al data som vi skal bruge til at bygge vores applikation.
import App from "../components/App";

//denne async function er ikke noget man kan huske i hoved, men noget vi ville finde i dokumentationen
export default async function Page() {
  //fetcher alle produkter og deres informationer. Vi har fået api'er fra vores dummy data
  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products"); //vores response er vores endpoint "products"
    const data = await response.json(); //den "venter" på at response er kørt færdig
    return data.products; //her returnerer den så vores data som json
  };
  //fetcher kategorier, det er samme princip dem ovenover
  const fecthCategories = async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    return data;
  };
  //gemmer data fra det som API'erne retunerer. Gør det muligt at bruge dataene lokalt i funktionen og sende dem videre som props til din App-komponent.
  const products = await fetchProducts();
  const categories = await fecthCategories();

  return (
    <>
      {/* produkt og kategori data er hentet og gemt og sendes som props til App-komponenten */}
      <App initialProducts={products} categories={categories} />
    </>
  );
}
