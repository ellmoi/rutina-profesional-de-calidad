# NORTE — README maestro

NORTE es una aplicación web personal para Moisés. Reúne el planeador diario, hábitos, diario, finanzas, gestión de imprevistos y una ruta profesional que comienza en desarrollo de software y evoluciona hacia ciberseguridad.

Este documento tiene dos objetivos: enseñarte a usar la aplicación y servirte como guía de estudio para comprender cómo fue construida.

## 1. Qué incluye esta versión

- Panel de inicio con nivel, XP, racha, cumplimiento y saldo mensual.
- Rutina diaria basada en tu horario real de Campuslands, entrenamiento, estudio e inglés.
- Tareas editables y acumulación de experiencia al completarlas.
- Hábitos personales con rachas.
- Roadmap 2026–2030 dividido en cinco fases y 28 competencias.
- Finanzas personales con ingresos, gastos y saldo.
- Diario de mañana y noche.
- Registro visual de riesgos e imprevistos.
- Tema oscuro y claro.
- Almacenamiento local con IndexedDB.
- Exportación e importación de copias JSON.
- Manifest y service worker para instalación y apertura sin conexión.
- Diseño adaptable para computador, tablet y teléfono.

## 2. Requisitos

Necesitas:

- Node.js 22.13 o superior.
- npm, incluido con Node.js.
- Chrome, Edge u otro navegador moderno.

Comprueba las versiones:

```bash
node --version
npm --version
```

## 3. Instalación y comandos

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
npm run dev
```

La terminal mostrará una dirección local. Ábrela en el navegador.

Otros comandos:

```bash
npm run build    # comprueba y crea la versión de producción
npm run start    # ejecuta la versión construida
npm run lint     # busca problemas de calidad en el código
npm run test     # construye y ejecuta las pruebas disponibles
```

En Windows PowerShell, si `npm` está bloqueado por la política de scripts, utiliza `npm.cmd`:

```powershell
npm.cmd run dev
npm.cmd run build
```

## 4. Cómo usar NORTE

### Inicio

Resume el día. Al marcar una tarea, cambia el porcentaje de cumplimiento y se suman sus puntos de experiencia.

### Mi día

Contiene tu rutina base. Puedes completar actividades o añadir una nueva con hora y categoría. La rutina es una guía editable, no una obligación rígida.

### Hábitos

Pulsa una tarjeta para marcar o desmarcar el hábito del día. Su racha se actualiza automáticamente.

### Roadmap

Cada competencia tiene tres estados: pendiente, en progreso y dominada. Cada pulsación avanza al siguiente estado y, después de dominada, vuelve a pendiente.

### Finanzas

Registra ingresos y gastos. El panel calcula ingresos, gastos y saldo disponible.

### Diario

Las respuestas se guardan automáticamente. Las preguntas de mañana ayudan a planear; las de noche convierten el día en aprendizaje.

### Ajustes y copias de seguridad

`Exportar copia JSON` descarga toda tu información. Guárdala en una ubicación segura. `Restaurar copia` carga nuevamente ese archivo.

Haz una copia semanal. El almacenamiento del navegador es duradero, pero puede eliminarse si se borran manualmente los datos del sitio o se cambia de dispositivo.

## 5. Instalación como PWA

1. Ejecuta la aplicación o abre su dirección publicada.
2. En Chrome o Edge, abre el menú del navegador.
3. Selecciona `Instalar NORTE` o `Aplicaciones > Instalar este sitio como aplicación`.
4. Confirma la instalación.

El archivo `public/manifest.webmanifest` define el nombre, colores e icono. `public/sw.js` conserva la interfaz esencial para iniciar la aplicación sin conexión.

## 6. Cómo funciona el guardado

NORTE usa IndexedDB, una base de datos incluida en el navegador. A diferencia de `localStorage`, IndexedDB está preparada para guardar estructuras mayores y registros durante largos periodos.

Flujo de guardado:

1. El componente abre la base `norte-personal`.
2. Si es la primera ejecución, crea el almacén `state`.
3. Busca el registro `profile`.
4. Si existe, reemplaza los datos de ejemplo por los guardados.
5. Cada cambio de estado escribe nuevamente el perfil.

Los datos no salen del dispositivo. La copia JSON es el mecanismo para moverlos a otro navegador o recuperarlos.

## 7. Estructura del proyecto

```text
app/
  layout.tsx       Metadatos, idioma, manifest y estructura raíz.
  page.tsx         Interfaz, estado, módulos y acciones principales.
  globals.css      Sistema visual, componentes y diseño responsive.
public/
  manifest.webmanifest  Configuración para instalar la PWA.
  sw.js                 Caché básico para funcionamiento sin conexión.
tests/
  rendered-html.test.mjs  Prueba incluida en la base del proyecto.
.openai/
  hosting.json     Configuración de publicación del sitio.
package.json       Dependencias y comandos npm.
README.md          Este manual de uso y estudio.
```

## 8. Cómo estudiar el código

Lee los archivos en este orden:

1. `app/layout.tsx`: aprende qué es un layout raíz y cómo se definen metadatos.
2. Inicio de `app/page.tsx`: estudia los tipos `Task`, `Habit`, `Skill`, `Tx` y `AppData`.
3. Constante `initial`: observa cómo los documentos personales se convirtieron en datos estructurados.
4. Componente `Home`: identifica `useState`, `useEffect` y los valores calculados.
5. Funciones `toggleTask`, `addTask`, `backup` y `restore`: sigue el ciclo completo de una acción.
6. Bloques que empiezan con `view ===`: cada uno corresponde a un módulo.
7. Componentes `Progress`, `Stat` y `Title`: ejemplos de reutilización.
8. `app/globals.css`: sigue las secciones numeradas del sistema visual al responsive.
9. `public/sw.js`: estudia instalación, caché y respuestas sin conexión.

### Ejercicio recomendado

Para comprender una función de principio a fin, agrega una categoría llamada `Entrevistas`:

1. Añádela al `select` del planeador.
2. Crea una actividad con esa categoría.
3. Comprueba cómo entra en `data.tasks`.
4. Recarga el navegador y confirma que IndexedDB la restauró.
5. Exporta una copia y localiza la tarea dentro del JSON.

## 9. Mapa mental de la arquitectura

```text
Interacción del usuario
        ↓
Funciones del componente (agregar, marcar, importar)
        ↓
Estado React: data
        ↓
Renderizado automático de tarjetas y métricas
        ↓
IndexedDB guarda el perfil localmente
```

Los datos viajan en una sola dirección. La interfaz no se modifica manualmente: se actualiza `data` y React vuelve a dibujar las partes afectadas.

## 10. Etiquetas y comentarios del código

El código está dividido con comentarios como:

```ts
// ── DATOS INICIALES ──
// ── COMPONENTE PRINCIPAL ──
// ── PIEZAS REUTILIZABLES ──
```

El CSS está organizado en ocho secciones numeradas. Estas etiquetas sirven como capítulos de estudio. No se comenta cada etiqueta HTML individual porque repetir lo evidente dificultaría la lectura; se documentan los bloques, decisiones y operaciones que sí requieren contexto.

## 11. Privacidad y seguridad

- No hay cuentas ni envío de información a servidores.
- No escribas contraseñas bancarias dentro del diario o las notas.
- Conserva las copias JSON en una carpeta privada.
- La importación reemplaza el estado actual: exporta primero si necesitas conservarlo.
- Antes de restablecer datos, la aplicación solicita confirmación.

## 12. Limitaciones actuales y ampliaciones recomendadas

Esta primera versión funcional usa un perfil local único. Las siguientes ampliaciones naturales son:

1. Historial por fecha para tareas, hábitos y diario.
2. Calendario mensual y revisiones semanales/trimestrales.
3. Módulos detallados de inglés, proyectos y entrenamiento.
4. Exportaciones CSV y PDF.
5. PIN y copias cifradas.
6. Pruebas unitarias para cálculos, importación y migraciones.
7. Migraciones versionadas de IndexedDB cuando cambie el modelo.

## 13. Solución de problemas

### No aparecen mis datos

Confirma que abriste la misma dirección y navegador. IndexedDB pertenece al origen del sitio; `localhost:3000` y `localhost:3001` se consideran ubicaciones diferentes.

### No puedo instalarla

La instalación PWA requiere un entorno seguro: `localhost` durante desarrollo o HTTPS cuando está publicada.

### Cambié el código pero no veo el cambio

Detén y reinicia `npm run dev`. Si el service worker conserva una versión anterior, abre las herramientas del navegador, entra en `Application > Service Workers` y pulsa `Unregister`; luego recarga.

### Quiero empezar de nuevo

En Ajustes, usa `Restablecer datos`. Antes, crea una copia JSON si quieres conservar el historial.

## 14. Principios que guiaron el diseño

- Personal antes que genérico.
- Fundamentos antes que modas.
- Constancia antes que perfección.
- Plan flexible ante cansancio e imprevistos.
- Privacidad local por defecto.
- Un sistema comprensible que también sirva para aprender programación.

NORTE no sustituye tus decisiones: te ayuda a verlas, medirlas y aprender de ellas.
