# Ledger de fidelidad visual

Fecha: 2026-09-13  
Referencia: brandbook web de FusionStructure en `/Users/crismora/Desktop/FusionStructureBrand/brandbook-site/`.

## Comparaciones cerradas

| Punto | Referencia del brandbook | Implementación | Estado |
| --- | --- | --- | --- |
| Copy | “Make complexity legible.” y estados explícitos | Shell técnico con `Modelo`, `Diagramas`, `Diseño`, `Evidencia`; estado `Experimental` y aviso no normativo | Alineado |
| Composición | Riel de proyecto + superficie de trabajo + inspector | `ProjectRail`, `ModelCanvas`, `ResultStack`, `DetailSheet`, `DesignInspector` | Alineado |
| Tipografía | Space Grotesk para display, Inter para UI, IBM Plex Mono para datos | Tokens de fuente en `global.css`; datos y unidades en estilo mono | Alineado |
| Color semántico | Momento coral, cortante verde, deformada violeta, acero rosa, atención ámbar | Variables `--fs-signal-*` reutilizadas en diagramas, puntos activos, evidencia y estados | Alineado |
| Materialidad | Superficies de arcilla, divisores finos, elevación discreta | Niveles `--fs-surface-*`, bordes y sombras suaves en tema día/noche | Alineado |
| Precisión técnica | Retícula, ejes, cotas y anotaciones | SVG con retícula, apoyos, carga, claro, flecha y detalle de sección/armado | Alineado |
| Responsive | La densidad se conserva en una composición móvil apilada | CSS con cortes a 1240/980/720/440 px; concepto móvil incluido como referencia | Parcial: requiere QA de navegador cuando haya runtime Playwright |

## Gaps deliberados

- El prototipo usa datos simulados; ninguna cifra debe interpretarse como dictamen.
- El concepto generado sirve como referencia de dirección, no como fuente de geometría ni de copy normativo.
- Aún falta una captura automatizada de la implementación a 1440 px, 940 px y 390 px porque esta sesión no dispone de `npx`/Playwright CLI ni del conector de navegador.

