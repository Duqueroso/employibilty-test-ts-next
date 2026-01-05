# 🐛 Registro de Errores y Soluciones | Errors and Solutions Log

---

## 📦 Configuración e Instalación | Setup & Installation

### 1. ❌ Error de versiones incompatibles al instalar dependencias
**Problema (ES):** Al instalar las dependencias con `npm install`, aparece un error relacionado con versiones incompatibles de paquetes.

**Problem (EN):** When installing dependencies with `npm install`, an error related to incompatible package versions appears.

**Solución (ES):** Revisa el archivo `package.json` para asegurarte de que las versiones de los paquetes sean compatibles entre sí. Puedes intentar eliminar la carpeta `node_modules` y el archivo `package-lock.json`, y luego ejecutar `npm install` nuevamente.

**Solution (EN):** Check the `package.json` file to ensure package versions are compatible with each other. You can try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.

---

### 2. ❌ Error de sintaxis en rutas de Next.js
**Problema (ES):** Al ejecutar el proyecto con `npm run dev`, aparece el siguiente error:
```
SyntaxError: Invalid regular expression: /^/_next/data/development/home).json$/: Unmatched ')'
```

**Problem (EN):** When running the project with `npm run dev`, the following error appears.

**Solución (ES):** Este error puede deberse a una configuración incorrecta en las rutas de tu proyecto. Revisa las rutas definidas en tu archivo de configuración y asegúrate de que no haya paréntesis desbalanceados o caracteres especiales mal escapados. La ruta `home)` tenía un paréntesis de más, se corrigió a `home`.

**Solution (EN):** This error may be due to incorrect route configuration. Check the defined routes and ensure there are no unbalanced parentheses or incorrectly escaped special characters. The route `home)` had an extra parenthesis, corrected to `home`.

---

## 📝 TypeScript & Tipado | TypeScript & Typing

### 3. ❌ Importaciones inconsistentes del mismo componente
**Problema (ES):** Había 2 importaciones distintas del mismo componente `Card`, una desde `"@/components/"` y otra desde `"../components/Card"`.

**Problem (EN):** There were 2 different imports of the same `Card` component, one from `"@/components/"` and another from `"../components/Card"`.

**Solución (ES):** Asegúrate de utilizar una única forma de importar el componente para evitar conflictos. Es recomendable usar rutas absolutas (como `"@/components/"`) para mantener la consistencia en todo el proyecto. Eliminamos una carpeta `components` duplicada y unificamos en una sola.

**Solution (EN):** Ensure you use a single import method to avoid conflicts. It's recommended to use absolute paths (like `"@/components/"`) to maintain consistency throughout the project. We removed a duplicate `components` folder and unified into one.

---

### 4. ❌ Error en importación de styled-components
**Problema (ES):** Error al importar `styled-components`.

**Problem (EN):** Error when importing `styled-components`.

**Solución (ES):** Asegúrate de tener instalado el paquete `styled-components` y sus tipos correspondientes si estás usando TypeScript:
```bash
npm install styled-components @types/styled-components
```
Además, verifica que las importaciones estén correctamente escritas.

**Solution (EN):** Make sure you have `styled-components` and its TypeScript types installed:
```bash
npm install styled-components @types/styled-components
```
Also, verify that imports are correctly written.

---

### 7. ❌ TypeScript en modo permisivo
**Problema (ES):** En el archivo `tsconfig.json`, las opciones `noImplicitAny` y `strict` estaban en `false`, lo que permitía que las variables pudieran tener el tipo `any` de forma implícita, llevando a errores difíciles de detectar.

**Problem (EN):** In the `tsconfig.json` file, the `noImplicitAny` and `strict` options were set to `false`, allowing variables to implicitly have the `any` type, leading to hard-to-detect errors.

**Solución (ES):** Cambia ambas opciones a `true` en el archivo `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```
Esto obligará a que todas las variables tengan un tipo explícito, mejorando la seguridad del tipo.

**Solution (EN):** Change both options to `true` in the `tsconfig.json` file. This will require all variables to have an explicit type, improving type safety.

---

### 8. ❌ Props sin tipar en componentes
**Problema (ES):** Props sin tipar en componentes (ej: `CharacterCard.tsx`).

**Problem (EN):** Untyped props in components (e.g., `CharacterCard.tsx`).

**Solución (ES):** Define interfaces o tipos para las props de tus componentes en TypeScript:
```typescript
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card = ({ title, description, imageUrl }: CardProps) => { ... }
```

**Solution (EN):** Define interfaces or types for your component props in TypeScript (see example above). This improves code clarity and helps prevent errors.

---

### 9. ❌ Función helpers sin tipado de retorno
**Problema (ES):** La función `helpers` no tiene tipado de retorno.

**Problem (EN):** The `helpers` function has no return type.

**Solución (ES):** Define el tipo de retorno de la función para mejorar la claridad del código:
```typescript
function isAlive(status: string): boolean {
  return status === 'Alive';
}
```

**Solution (EN):** Define the return type of the function to improve code clarity (see example above).

---

### 10. ❌ Uso de `any` en estados
**Problema (ES):** Uso de `any` en estados (`src/app/page.tsx` y `src/app/home/page.tsx`).

**Problem (EN):** Use of `any` in state variables.

**Solución (ES):** Evita el uso del tipo `any` en los estados de tus componentes. Define tipos específicos:
```typescript
const [characters, setCharacters] = useState<Character[]>([]);
```
Los definimos en el servicio `api.ts` y los importamos en las páginas correspondientes.

**Solution (EN):** Avoid using the `any` type in your component states. Define specific types (see example above). We defined them in the `api.ts` service and imported them in the corresponding pages.

---

### 18. ❌ Múltiples usos de `any` en dashboard
**Problema (ES):** En dashboard, varios usos de `any`.

**Problem (EN):** Multiple uses of `any` in the dashboard.

**Solución (ES):** Reemplaza el uso de `any` con tipos específicos. Define interfaces o tipos adecuados para los datos que estás manejando.

**Solution (EN):** Replace the use of `any` with specific types. Define appropriate interfaces or types for the data you're handling.

---

### 20. ❌ Manejo de errores no tipado correctamente
**Problema (ES):** En dashboard, el manejo de errores en la llamada a la API no estaba tipado correctamente.

**Problem (EN):** In the dashboard, error handling in the API call was not correctly typed.

**Solución (ES):** Tipa correctamente el error capturado en el bloque `catch`:
```typescript
try {
  // ...
} catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('An unexpected error occurred');
  }
}
```

**Solution (EN):** Correctly type the caught error in the `catch` block (see example above).

---

### 21. ❌ Interface duplicada
**Problema (ES):** En dashboard, la interface estaba duplicada con la del servicio `api.ts`.

**Problem (EN):** In the dashboard, the interface was duplicated from the `api.ts` service.

**Solución (ES):** Centraliza la definición de la interfaz `Character` en el archivo `api.ts` y reutilízala:
```typescript
// api.ts
export interface Character { ... }

// dashboard/page.tsx
import { Character } from '@/services/api';
```

**Solution (EN):** Centralize the `Character` interface definition in the `api.ts` file and reuse it (see example above).

---

### 23. ❌ Ruta a src mal definida en tsconfig
**Problema (ES):** En la configuración de `tsconfig.json`, la ruta a `src` no estaba bien definida.

**Problem (EN):** In the `tsconfig.json` configuration, the path to `src` was not properly defined.

**Solución (ES):** Asegúrate de que la ruta esté correctamente definida:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
Se elimina `baseUrl` que no es necesario.

**Solution (EN):** Ensure the path is correctly defined (see example above). Remove `baseUrl` as it's not necessary.

---

## 🔌 API & Servicios | API & Services

### 5. ❌ Manejo de errores incompleto en `getCharacters`
**Problema (ES):** Revisando la función `getCharacters` en `api.ts`, no se estaba manejando el error en caso de que la respuesta del `fetch` no fuera exitosa, también faltaba el parseo del JSON.

**Problem (EN):** Reviewing the `getCharacters` function in `api.ts`, errors were not being handled if the `fetch` response was not successful, and JSON parsing was missing.

**Solución (ES):** Agrega una verificación para `response.ok` y lanza un error si la respuesta no es exitosa:
```typescript
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

const data: ApiResponse = await response.json();
```

**Solution (EN):** Add a check for `response.ok` and throw an error if the response is not successful (see example above).

---

### 6. ❌ Fetch directo en lugar de usar el servicio
**Problema (ES):** Varias páginas usaban `fetch` directamente en lugar de usar la función `getCharacters` del servicio `api.ts`.

**Problem (EN):** Several pages used `fetch` directly instead of using the `getCharacters` function from the `api.ts` service.

**Solución (ES):** Centraliza las llamadas a la API utilizando la función `getCharacters` desde `api.ts`:
```typescript
// ❌ Antes
const response = await fetch('https://rickandmortyapi.com/api/character');
const data = await response.json();

// ✅ Después
import { getCharacters } from '@/services/api';
const characters = await getCharacters();
```

**Solution (EN):** Centralize API calls using the `getCharacters` function from `api.ts` (see example above).

---

### 22. ❌ Dashboard haciendo fetch directo
**Problema (ES):** En dashboard, se hace `fetch` directamente en lugar de usar la función `getCharacters` del servicio `api.ts`.

**Problem (EN):** In the dashboard, `fetch` is called directly instead of using the `getCharacters` function from the `api.ts` service.

**Solución (ES):** Reemplaza la llamada directa a `fetch` con la función `getCharacters()` desde `api.ts`.

**Solution (EN):** Replace the direct `fetch` call with the `getCharacters()` function from `api.ts`.

---

### 27. ❌ Sin validación de formato de respuesta API
**Problema (ES):** En el servicio `api.ts` no había validación de que la respuesta tenga el formato esperado.

**Problem (EN):** In the `api.ts` service, there was no validation that the response has the expected format.

**Solución (ES):** Agrega validaciones para asegurarte de que la respuesta de la API tenga el formato esperado:
```typescript
const data: ApiResponse = await response.json();

if (!data.results || !Array.isArray(data.results)) {
  throw new Error('Invalid API response format');
}

return data.results;
```

**Solution (EN):** Add validations to ensure the API response has the expected format (see example above).

---

### 36. ❌ API solo traía una página de personajes
**Problema (ES):** El servicio `api.ts` solo llamaba los personajes de una página (20 personajes), no todos (826 personajes).

**Problem (EN):** The `api.ts` service only fetched characters from one page (20 characters), not all (826 characters).

**Solución (ES):** Modifica la función `getCharacters` en `api.ts` para que realice múltiples llamadas en paralelo usando `Promise.all` y recopile todos los personajes de todas las páginas:
```typescript
export async function getCharacters(): Promise<Character[]> {
  const firstResponse = await fetch("https://rickandmortyapi.com/api/character");
  const firstData: ApiResponse = await firstResponse.json();
  const totalPages = firstData.info.pages;
  
  const pagePromises = Array.from({ length: totalPages }, (_, i) => 
    fetch(`https://rickandmortyapi.com/api/character?page=${i + 1}`)
      .then(res => res.json())
  );
  
  const allPages: ApiResponse[] = await Promise.all(pagePromises);
  const allCharacters = allPages.flatMap(page => page.results);
  
  return allCharacters;
}
```

**Solution (EN):** Modify the `getCharacters` function in `api.ts` to make multiple parallel calls using `Promise.all` and collect all characters from all pages (see example above).

---

## 🎨 Componentes & UI | Components & UI

### 11. ❌ Vistas duplicadas (home y page)
**Problema (ES):** Las vistas `home` y `page` tienen código duplicado.

**Problem (EN):** The `home` and `page` views have duplicated code.

**Solución (ES):** Revisa las vistas `home` y `page` para identificar el código duplicado. Elimina una de las vistas y asegúrate de que la funcionalidad necesaria se mantenga en la vista restante. Eliminamos `home` y dejamos solo `page` como vista principal.

**Solution (EN):** Review the `home` and `page` views to identify duplicated code. Remove one of the views and ensure necessary functionality remains in the remaining view. We removed `home` and kept only `page` as the main view.

---

### 12. ❌ Frameworks de estilos mezclados
**Problema (ES):** Se mezclan frameworks de estilos (`styled-components` y `module.css`).

**Problem (EN):** Mixing styling frameworks (`styled-components` and `module.css`).

**Solución (ES):** Elige un solo framework de estilos para tu proyecto y refactoriza el código para utilizar únicamente ese framework. En este caso, optamos por usar solo `styled-components` y eliminamos los archivos `.module.css`. (Esto es a criterio de cada quien).

**Solution (EN):** Choose a single styling framework for your project and refactor the code to use only that framework. In this case, we opted to use only `styled-components` and removed `.module.css` files. (This is up to personal preference).

---

### 14. ❌ Keys usando index en lugar de ID único
**Problema (ES):** Como buena práctica, las `key` en los `map` deben ser únicas y preferentemente un identificador único del objeto, no el index del array.

**Problem (EN):** As a best practice, `key` in `map` should be unique and preferably a unique identifier of the object, not the array index.

**Solución (ES):** Utiliza un identificador único del objeto (como un ID) como `key`:
```typescript
// ❌ Antes
{characters.map((char, index) => <Card key={index} {...char} />)}

// ✅ Después
{characters.map((char) => <Card key={char.id} {...char} />)}
```

**Solution (EN):** Use a unique identifier of the object (like an ID) as `key` (see example above).

---

### 24. ❌ Imagen del personaje mostrada dos veces
**Problema (ES):** En la página principal, se estaba mostrando la imagen del personaje dos veces: una en el componente `Card` y otra con una etiqueta `<img>` adicional.

**Problem (EN):** On the main page, the character image was being displayed twice: once in the `Card` component and once with an additional `<img>` tag.

**Solución (ES):** Elimina la etiqueta `<img>` adicional que muestra la imagen del personaje fuera del componente `Card`.

**Solution (EN):** Remove the additional `<img>` tag that displays the character image outside the `Card` component.

---

### 25. ❌ Nombre del personaje mostrado dos veces
**Problema (ES):** En la página principal, el nombre del personaje estaba siendo mostrado dos veces: una en una etiqueta `<h3>` y otra en el componente `Card`.

**Problem (EN):** On the main page, the character name was being displayed twice: once in an `<h3>` tag and once in the `Card` component.

**Solución (ES):** Elimina la etiqueta `<h3>` que muestra el nombre del personaje fuera del componente `Card`.

**Solution (EN):** Remove the `<h3>` tag that displays the character name outside the `Card` component.

---

### 26. ❌ Componentes similares duplicados
**Problema (ES):** Los componentes `Card` y `CharacterCard` tienen funcionalidades similares, se puede unificar en uno solo.

**Problem (EN):** The `Card` and `CharacterCard` components have similar functionalities and can be unified into one.

**Solución (ES):** Revisa las funcionalidades de los componentes `Card` y `CharacterCard` y unifícalos en un solo componente si tienen responsabilidades similares. Eliminamos `CharacterCard` y dejamos solo `Card`.

**Solution (EN):** Review the functionalities of the `Card` and `CharacterCard` components and unify them into a single component if they have similar responsibilities. We removed `CharacterCard` and kept only `Card`.

---

### 28. ❌ Keys en Sidebar usando index
**Problema (ES):** En el componente `Sidebar`, las `key` en el `map` estaban usando el index del array en lugar de un identificador único.

**Problem (EN):** In the `Sidebar` component, the `key` in the `map` were using the array index instead of a unique identifier.

**Solución (ES):** Cambia la `key` en el mapeo de `items` para usar un identificador único, como `item.label`:
```typescript
{items.map((item) => <Item key={item.label}>{item.label}</Item>)}
```

**Solution (EN):** Change the `key` in the `items` mapping to use a unique identifier, like `item.label` (see example above).

---

### 32. ❌ Estado de carga con div simple
**Problema (ES):** Usar el componente `LoadingState` para mostrar el estado de carga en lugar de un `<div>` simple.

**Problem (EN):** Use the `LoadingState` component to show loading state instead of a simple `<div>`.

**Solución (ES):** Reemplaza el `<div>` que muestra el estado de carga con el componente `LoadingState`:
```typescript
// ❌ Antes
{loading && <div>Loading...</div>}

// ✅ Después
import LoadingState from '@/components/LoadingState';
{loading && <LoadingState />}
```

**Solution (EN):** Replace the `<div>` showing the loading state with the `LoadingState` component (see example above).

---

### 33. ❌ Código duplicado para mostrar personajes
**Problema (ES):** Se usa el componente `Card` en dashboard para mostrar los personajes en lugar de repetir el código.

**Problem (EN):** Use the `Card` component in the dashboard to show characters instead of repeating code.

**Solución (ES):** Reemplaza el código duplicado que muestra los personajes en la vista `dashboard` con el componente `Card`.

**Solution (EN):** Replace the duplicated code showing characters in the `dashboard` view with the `Card` component.

---

## 🔄 Estados & Lógica | State & Logic

### 15. ❌ Estado de loading mal utilizado
**Problema (ES):** El estado de `loading` no se estaba utilizando correctamente, se debe setear en `true` al iniciar la carga y en `false` al finalizarla.

**Problem (EN):** The `loading` state was not being used correctly; it should be set to `true` when starting to load and `false` when finished.

**Solución (ES):** Asegúrate de establecer el estado de `loading` correctamente:
```typescript
const fetchData = async () => {
  setLoading(true);
  try {
    const data = await getCharacters();
    setCharacters(data);
  } catch (err) {
    setError('Error loading characters');
  } finally {
    setLoading(false);
  }
};
```

**Solution (EN):** Ensure you set the `loading` state correctly (see example above).

---

### 16. ❌ Estado de error no manejado en UI
**Problema (ES):** No se estaba manejando el estado de error en la interfaz de usuario.

**Problem (EN):** The error state was not being handled in the user interface.

**Solución (ES):** Implementa un estado de `error` en tu componente y muestra un mensaje amigable:
```typescript
const [error, setError] = useState<string | null>(null);

// En el JSX
{error && <div className="error">{error}</div>}
```

**Solution (EN):** Implement an `error` state in your component and display a friendly message (see example above).

---

### 17. ❌ Propiedad mal referenciada en dashboard
**Problema (ES):** En la vista dashboard, la descripción del personaje estaba mal referenciada como `description` en lugar de `species`.

**Problem (EN):** In the dashboard view, the character description was incorrectly referenced as `description` instead of `species`.

**Solución (ES):** Cambia `char.description` por `char.species` para reflejar correctamente la especie del personaje.

**Solution (EN):** Change `char.description` to `char.species` to correctly reflect the character's species.

---

### 29. ❌ Sin manejo de lista vacía de personajes
**Problema (ES):** En la vista principal, no se manejaba el caso cuando no se encontraban personajes para mostrar.

**Problem (EN):** In the main view, the case when no characters were found was not handled.

**Solución (ES):** Agrega una condición para verificar si la lista de personajes está vacía:
```typescript
{characters.length === 0 && !loading && (
  <div>No se encontraron personajes</div>
)}
```

**Solution (EN):** Add a condition to check if the character list is empty (see example above).

---

## 🛠️ Herramientas & Configuración | Tools & Configuration

### 19. ❌ Sin herramienta de análisis de código
**Problema (ES):** No tiene instalado un lector de errores como ESLint.

**Problem (EN):** No code analysis tool like ESLint is installed.

**Solución (ES):** Instala y configura ESLint:
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx eslint --init
```

**Solution (EN):** Install and configure ESLint (see commands above).

---

### 30. ❌ Dependencia no utilizada (mongoose)
**Problema (ES):** No se utiliza mongoose en el proyecto.

**Problem (EN):** Mongoose is not used in the project.

**Solución (ES):** Si no estás utilizando Mongoose en tu proyecto, elimina la importación de `set` desde `mongoose` en el archivo `src/app/page.tsx`.

**Solution (EN):** If you're not using Mongoose in your project, remove the `set` import from `mongoose` in the `src/app/page.tsx` file.

---

### 31. ✅ Configuración de styled-components con SSR
**Problema (ES):** Se crea archivo `next.config.ts` para habilitar `styled-components` con SSR.

**Problem (EN):** Create `next.config.ts` file to enable `styled-components` with SSR.

**Solución (ES):** Crea un archivo `next.config.ts` en la raíz del proyecto:
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
```

**Solution (EN):** Create a `next.config.ts` file in the project root (see example above).

---

## 🎨 Mejoras Visuales & Funcionales | Visual & Functional Improvements

### 34. ✅ Mejora de apariencia visual
**Descripción (ES):** Se mejora la apariencia visual de las vistas con la paleta de colores de Rick and Morty:
- `#88e23b` (verde brillante)
- `#ebe480` (amarillo)
- `#043c6e` (azul oscuro)
- `#60a85f` (verde claro)
- `#a6cccc` (azul claro)
- `#6b7132` (verde oliva)

**Description (EN):** Visual appearance of views improved with Rick and Morty color palette (see colors above).

---

### 35. ✅ Sistema de autenticación simulado
**Descripción (ES):** Se agrega funcionalidad para hacer el login de usuarios (simulado).

**Description (EN):** User login functionality added (simulated).

**Implementación (ES):** Se implementa una funcionalidad básica de login de usuarios en la aplicación simulando el proceso de autenticación sin necesidad de un backend real, utilizando estados locales para manejar el estado de autenticación del usuario.

**Implementation (EN):** Basic user login functionality implemented, simulating the authentication process without needing a real backend, using local states to handle user authentication state.

**Credenciales de prueba | Test credentials:**
- Email: `rick@sanchez.com`
- Password: `wubba123`

---

## 📊 Resumen | Summary

**Total de problemas resueltos | Total problems solved:** 36

**Categorías | Categories:**
- 🔧 Configuración & Setup: 2
- 📝 TypeScript & Tipos: 11
- 🔌 API & Servicios: 5
- 🎨 Componentes & UI: 9
- 🔄 Estados & Lógica: 5
- 🛠️ Herramientas: 2
- ✨ Mejoras: 2    

