import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// PRUEBAS DE ESTRUCTURA: comprueban que la versión entregada conserve sus pilares.
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("incluye la identidad y metadatos de NORTE", async () => {
  const layout = await read("app/layout.tsx");
  assert.match(layout, /NORTE — Sistema personal de Moisés/);
  assert.match(layout, /lang="es"/);
  assert.match(layout, /manifest\.webmanifest/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
});

test("usa almacenamiento local y permite respaldos", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /indexedDB\.open\("norte-personal"/);
  assert.match(page, /norte-backup-/);
  assert.match(page, /Exportar copia JSON/);
  assert.match(page, /Restaurar copia/);
});

test("incluye los módulos personales y el roadmap", async () => {
  const page = await read("app/page.tsx");
  for (const label of ["Campuslands", "Entrenamiento físico", "Roadmap", "Finanzas", "Diario", "Imprevistos", "OWASP Top 10", "DevSecOps"]) assert.match(page, new RegExp(label));
});

test("incluye los recursos mínimos de PWA", async () => {
  const [manifest, worker] = await Promise.all([read("public/manifest.webmanifest"), read("public/sw.js")]);
  const parsed = JSON.parse(manifest.replace(/^\uFEFF/, ""));
  assert.equal(parsed.short_name, "NORTE");
  assert.equal(parsed.display, "standalone");
  assert.match(worker, /caches\.open/);
  assert.match(worker, /fetch/);
});

test("el README funciona como manual de uso y estudio", async () => {
  const readme = await read("README.md");
  for (const section of ["Cómo usar NORTE", "Cómo funciona el guardado", "Cómo estudiar el código", "Solución de problemas"]) assert.match(readme, new RegExp(section));
});
