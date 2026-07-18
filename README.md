# 10 Ejercicios de React - useState

Una pequeña colección de 10 ejercicios implementados en React (Vite) para practicar useState y persistencia en el navegador usando localStorage. La app está pensada para ser simple y didáctica: no requiere dependencias externas además de React y Vite.

## ¿Qué contiene?
- Ejercicio 1: Contador interactivo (ya implementado)
- Ejercicio 2: Formulario de registro simple (nombre, email, edad)
- Ejercicio 3: Lista de tareas (añadir, marcar, eliminar)
- Ejercicio 4: Conversor de unidades (km ↔ millas)
- Ejercicio 5: Calculadora simple (+, −, ×, ÷)
- Ejercicio 6: Tienda de cafés (productos y carrito)
- Ejercicio 7: Buscador de películas (simulado, datos locales)
- Ejercicio 8: Generador de frases aleatorias
- Ejercicio 9: Control de gastos (añadir gasto, eliminar, total)
- Ejercicio 10: Selector de temas (light / dark / colorful)

Cada ejercicio tiene su propio componente en `src/components/Exercise{n}.jsx`. La navegación y el guardado del progreso (ejercicios completados) están en `src/App.jsx`.

## Estructura principal

src/
  App.jsx         — navegación y estado global (página seleccionada y ejercicios completados)
  main.jsx        — punto de entrada
  styles.css      — estilos básicos y temas
  components/     — componentes Exercise1..Exercise10

## Requisitos
- Node.js 16+ y npm
- No se requieren claves externas ni APIs

## Uso (desarrollo)

1. Clona el repositorio:
   git clone https://github.com/christoferponceh-rgb/10-Ejercicios.git
2. Entra al directorio y instala dependencias:
   cd 10-Ejercicios
   npm install
3. Ejecuta la app en modo desarrollo:
   npm run dev
4. Abre la URL que indique Vite (por defecto http://localhost:5173)

## Cómo funciona la persistencia
- Los ejercicios guardan su estado en `localStorage` usando claves con prefijo `exercise{n}_...`. Por ejemplo:
  - `exercise1_count`, `exercise2_form`, `exercise3_todos`, `exercise6_cart`, `theme`, etc.
- La selección de página también se guarda (`selectedPage`) y la lista de ejercicios completados se guarda en `completedExercises`.

## Marcado de completado
- Dentro de cada ejercicio hay un botón "Marcar/Desmarcar completado" que actualiza la bandera en localStorage y notifica a `App` mediante las props `markCompleted(n)` / `unmarkCompleted(n)`. Esto muestra un ✅ junto al botón del ejercicio en la navegación.

## Notas y mejoras futuras
- Accesibilidad: agregar `aria-*` y mejorar labels.
- Validaciones: las validaciones son básicas; se pueden reforzar si se desea.
- Tests: añadir tests unitarios y de integración.
- Diseño: mejorar estilos por ejercicio para una experiencia más consistente.

## Contribuir
Si quieres mejorar o pulir alguno de los ejercicios, abre un PR o crea un issue con la mejora propuesta.

---

Autor: christoferponceh-rgb
