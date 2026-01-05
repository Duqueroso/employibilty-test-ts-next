export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export async function getCharacters(): Promise<Character[]> {
  // Primera llamada para obtener el total de páginas
  const firstResponse = await fetch("https://rickandmortyapi.com/api/character");
  
  if (!firstResponse.ok) {
    throw new Error(`HTTP error! status: ${firstResponse.status}`);
  }
  
  const firstData: ApiResponse = await firstResponse.json();
  
  if (!firstData.results || !Array.isArray(firstData.results)) {
    throw new Error('Invalid API response format');
  }
  
  const totalPages = firstData.info.pages;
  
  // Crear array de promesas para todas las páginas (1 hasta totalPages)
  const pagePromises = Array.from({ length: totalPages }, (_, i) => 
    fetch(`https://rickandmortyapi.com/api/character?page=${i + 1}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
  );
  
  // Ejecutar todas las peticiones en paralelo
  const allPages: ApiResponse[] = await Promise.all(pagePromises);
  
  // Combinar todos los personajes de todas las páginas
  const allCharacters = allPages.flatMap(page => page.results);
  
  return allCharacters;
}