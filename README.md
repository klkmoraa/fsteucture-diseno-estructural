# Fsteucture Diseño Estructural

## FStructure Design Workbench

Prototipo experimental para hacer legible el flujo de diseño estructural: hipótesis, acciones, diagramas, acero, detalles y evidencia normativa en una sola superficie. La dirección visual sigue el brandbook web de FusionStructure y su principio rector: “Make complexity legible.”

> Este repositorio no certifica cálculos ni sustituye la revisión de una persona responsable. Los resultados actuales son deterministas e ilustrativos.

## Qué se puede probar

- Editar claro, sección, concreto, carga y recubrimiento de una viga de concreto reforzado.
- Recalcular una respuesta de demostración: momento, cortante, deformada, acero longitudinal y estribos.
- Cambiar entre `Modelo`, `Diagramas`, `Diseño` y `Evidencia`.
- Leer el detalle 2D de sección y armado, junto con hipótesis y referencia pública.
- Alternar tema de día/noche y guardar una versión local.

## Decisión técnica

La primera entrega es 2D-first: React + TypeScript + Vite para la superficie, SVG para diagramas/cotas/detalles y una frontera futura de Python para cálculo reproducible. Three.js queda reservado para coordinación 3D, ejes, diafragmas y revisión espacial cuando el modelo semántico 2D esté validado.

La investigación que sustenta esa decisión está en [`docs/research/technical-landscape.md`](docs/research/technical-landscape.md). Las alternativas revisadas incluyen EduBeam, PyNite, OpenSees/OpenSeesPy, XC, FreeCAD FEM, IfcOpenShell y Three.js.

## Arranque local

```bash
pnpm install
pnpm dev
```

Comandos de verificación:

```bash
pnpm run check
```

La carpeta `docs/references/normative/` contiene copias públicas de referencia de NTC CDMX de concreto, acero, sismo y viento. El índice registra fuente, edición y límites de uso.

## Mapa del proyecto

- [`src/domain`](src/domain): snapshot de diseño y transformaciones ilustrativas.
- [`src/components`](src/components): shell, canvas 2D, resultados, inspector, detalle y evidencia.
- [`src/styles`](src/styles): tokens FusionStructure, temas y composición responsive.
- [`docs/superpowers/specs/2026-09-13-fstructure-design-workbench-design.md`](docs/superpowers/specs/2026-09-13-fstructure-design-workbench-design.md): especificación del producto.
- [`docs/superpowers/plans/2026-09-13-fstructure-design-workbench.md`](docs/superpowers/plans/2026-09-13-fstructure-design-workbench.md): plan ejecutado.
- [`public/concepts/design-workbench-desktop.png`](public/concepts/design-workbench-desktop.png) y [`public/concepts/design-workbench-mobile.png`](public/concepts/design-workbench-mobile.png): referencias visuales generadas para la dirección de interfaz.

## Próxima fase de ingeniería

1. Sustituir las transformaciones ilustrativas por un worker con unidades explícitas y casos manuales de referencia.
2. Separar adaptadores de norma para concreto, acero, sismo, viento y presfuerzo.
3. Versionar `DesignSnapshot` y `DesignCheck` como contrato entre UI, motor y memoria de cálculo.
4. Incorporar combinaciones de carga, axial y marcos 2D antes de abrir la coordinación 3D.
5. Agregar exportación de memoria con procedencia, hipótesis, ecuaciones y revisión profesional.
