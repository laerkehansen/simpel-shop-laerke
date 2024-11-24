import ProductSingle from "@/app/components/ProductSingle";

// Definerer en asynkron React-komponent, som modtager params fra dynamiske ruter

//Product er en funktion, som bruges til at lave noget arbejde. Funktionen er skrevet som en asynkron funktion (async), hvilket betyder, at den kan håndtere ting, der tager tid, som for eksempel at hente data fra en server.
//Når en funktion er asynkron, kan vi bruge await inde i den. await betyder "vent på, at denne del bliver færdig, før du fortsætter."

// { params } er destrukturering af et objekt. Det betyder, at vi tager én del af et objekt og gør det nemt at bruge. Lad os se, hvordan det fungerer.

const Product = async ({ params }) => {
  // Henter produkt-ID fra params (dynamisk segment fra URL)
  const id = (await params).id; //(await params) betyder: Vent, indtil params er tilgængelig. (Dette er sjældent nødvendigt i moderne Next.js, hvor params normalt er klar med det samme.) .id: Når vi har params, tager vi ID'et fra det.
  // Henter produktdata fra en ekstern API baseret på ID
  let response = await fetch(`https://dummyjson.com/products/${id}`);
  let data = await response.json(); // Konverterer API-responsen til JSON

  // Returnerer en JSX-struktur med komponenten ProductSingle
  return (
    <>
      {/* Viser produktdetaljer ved at sende de hentede data som en prop */}
      <ProductSingle product={data} />
    </>
  );
};

// Eksporterer komponenten, så den kan bruges andre steder i applikationen
export default Product;
