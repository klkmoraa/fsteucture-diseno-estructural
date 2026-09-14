# FStructure Design Workbench — Diseño del producto

## Estado

Propuesta de trabajo implementada como prototipo inicial. El prototipo es exploratorio: no certifica cálculos, no sustituye la revisión de una persona responsable y no debe usarse para autorizar obra.

## Idea central

FStructure Design Workbench es un espacio de trabajo para convertir un modelo estructural en una decisión legible: qué se supuso, qué se calculó, qué exige la norma y qué debe revisarse. La primera superficie integra un elemento estructural, sus acciones, diagramas semánticos, comprobaciones y un detalle constructivo paramétrico.

La frase rectora es la del brandbook: **Make complexity legible.**

## Alcance del primer prototipo

El prototipo debe demostrar un flujo completo y local, con datos simulados claramente identificados:

1. Abrir un proyecto de ejemplo de una viga de concreto reforzado.
2. Cambiar luz, sección, material y carga distribuida.
3. Ver cómo cambian momento, cortante, flecha y acero longitudinal/estribos.
4. Alternar entre las vistas `Modelo`, `Diagramas`, `Diseño` y `Evidencia`.
5. Leer una comprobación con estado `Disponible`, `Experimental` o `Revisión` y su referencia normativa.
6. Ver un detalle 2D de la sección y un corte longitudinal con barras y estribos.
7. Cambiar día/noche, exportar una memoria simulada y conservar el estado local.

El prototipo no implementa todavía un solver normativo, un cálculo de edificio completo, una malla 3D, interacción suelo-estructura, conexión de acero ni una base de datos de materiales comercial.

## Base normativa inicial

Se asume México como primer adaptador por el contexto de trabajo. La estructura de código separará el motor de cálculo de los adaptadores de normativa.

- Concreto reforzado y presforzado: NTC para Diseño y Construcción de Estructuras de Concreto de Ciudad de México, versión pública 2017.
- Acero: NTC de Diseño y Construcción de Estructuras de Acero, versión pública 2020 disponible en SMIE; el adaptador debe poder incorporar la edición vigente sin alterar el modelo común.
- Sismo, viento y acciones: adaptadores separados de las reglas de material.
- Referencias internacionales futuras: ACI 318, AISC 360 y ASCE 7. No se copian textos protegidos; se registran versiones, capítulos y enlaces autorizados.

Cada resultado normativo llevará código de norma, edición, cláusula, hipótesis, unidades y procedencia. Si falta una entrada necesaria, el producto mostrará `Revisión` y explicará qué dato falta.

## Arquitectura propuesta

### Shell de producto

React + TypeScript + Vite, con un shell de aplicación compuesto por:

- `AppShell`: barra de marca, navegación de superficie, estado del proyecto y control de tema.
- `ProjectRail`: árbol mínimo del proyecto y selección de elemento.
- `ModelCanvas`: SVG 2D para geometría, cargas, apoyos y anotaciones.
- `ResultStack`: diagramas de axial, momento, cortante, deformada y acero.
- `DesignInspector`: entradas de sección/material/carga y estados de revisión.
- `DetailSheet`: sección transversal, barras, estribos, recubrimiento y cotas.
- `EvidenceDrawer`: hipótesis, versión normativa, ecuaciones y trazabilidad.

La interfaz no contendrá ecuaciones escondidas dentro de componentes visuales. Cada vista consumirá un `DesignSnapshot` tipado y una lista de `DesignCheck`.

### Modelo de datos mínimo

```ts
type DesignSnapshot = {
  projectId: string;
  code: { id: 'ntc-cdmx-2017'; edition: string; locale: 'es-MX' };
  member: { id: string; type: 'beam'; material: 'reinforced-concrete' };
  geometry: { spanMm: number; widthMm: number; depthMm: number; coverMm: number };
  actions: { deadKnm: number; liveKnm: number; combination: string };
  results: {
    momentKnm: number;
    shearKn: number;
    deflectionMm: number;
    longitudinalSteelMm2: number;
    stirrupSpacingMm: number;
  };
  checks: DesignCheck[];
};

type DesignCheck = {
  id: string;
  label: string;
  state: 'available' | 'experimental' | 'review';
  ratio?: number;
  unit?: string;
  reference: { clause: string; source: string };
  assumptions: string[];
};
```

El prototipo calcula sólo una respuesta ilustrativa determinista en el cliente; el contrato está listo para sustituirse por un worker Python o un servicio de cálculo sin cambiar las vistas.

### Separación del motor

Fase 1: datos simulados y funciones de demostración en TypeScript para probar el flujo visual.

Fase 2: motor Python con unidades explícitas y pruebas contra soluciones manuales; PyNite puede servir como referencia para análisis lineal 3D y OpenSeesPy/OpenSees para análisis avanzado, pero las licencias y los límites de redistribución deben revisarse antes de incluirlos como dependencia de un producto comercial.

Fase 3: adaptadores de sección, concreto reforzado, acero y presfuerzo con contratos de resultado reproducibles; el solver de propósito general y el diseño por norma permanecen separados.

## Decisión 2D/3D

La primera experiencia será 2D porque el usuario necesita leer diagramas, cuantías y detalles, y porque el dominio 2D permite comparar fácilmente contra casos manuales. La vista 3D aparecerá como coordinación visual y revisión de geometría, no como requisito para operar el cálculo.

La evolución prevista es:

1. 2D: miembros, diagramas, secciones y detalles.
2. 2.5D: ejes, niveles, diafragmas y relaciones entre elementos.
3. 3D: marco espacial, losas/muros y coordinación IFC.

Three.js se reserva para esa segunda capa; SVG queda como representación de precisión para diagramas, cotas, armados y reportes.

## Dirección visual

Se heredan los tokens y reglas del brandbook de FusionStructure:

- Fondo de día `#F7F6F1` y fondo de noche `#14171A`.
- Superficie `#FFFEFA` / `#1B1F22`, hundida `#EDEFE9` / `#252A2E`.
- Acento de marca `#1AA57A` sólo para identidad, navegación y foco.
- Axial azul, momento coral, cortante verde, deformada violeta, fluencia rosa y atención ámbar.
- Space Grotesk para display, Inter para interfaz e IBM Plex Mono para datos/unidades.
- Profundidad de arcilla leve: plano para datos, interior para interacción, elevado para inspector y flotante para evidencia.
- Iconos lineales, retícula compartida, trazo redondeado y color semántico; no se usan colores de resultado como decoración.

La pantalla principal no será un tablero de tarjetas. Tendrá un riel de proyecto, una hoja/canvas de trabajo y un inspector lateral; los resultados aparecen como trazas y filas técnicas, no como métricas inventadas.

## Interacción y estados

- Los controles de parámetros son editables y recalculan los valores ilustrativos localmente.
- La selección de un diagrama cambia el panel de evidencia y el detalle resaltado.
- `Aplicar cambios` actualiza un snapshot, marca el proyecto como no guardado y permite `Guardar versión`.
- La vista `Evidencia` expone la referencia, unidades, hipótesis y advertencias.
- Los estados de producto siempre se muestran antes de la promesa: `Disponible`, `Experimental`, `Planeado` y `Revisión`.
- `prefers-reduced-motion` elimina desplazamientos y deja sólo cambios de estado.

## Seguridad técnica del dominio

- No se incluirán textos completos de normas protegidas ni se presentará el prototipo como software normativo.
- No se mezclan unidades sin declarar el sistema.
- Un dato faltante no se convierte en cero silenciosamente.
- Resultados simulados llevarán una marca visible de prototipo.
- La trazabilidad se modela desde el inicio: entrada → ecuación/regla → resultado → decisión.

## Verificación

La entrega del prototipo se verificará con:

- typecheck y build de producción;
- pruebas unitarias de transformación de entradas a snapshot;
- prueba de interacción para cambiar carga y actualizar diagramas/armado;
- revisión visual en 1440 px, 940 px y 390 px;
- día y noche;
- inspección de la imagen conceptual y del último render con `view_image`;
- ledger de fidelidad con al menos cinco comparaciones: copy, composición, tipografía, color semántico, profundidad/material, responsive y estados.

## Fuera de alcance explícito

No se promete certificación, firma digital, cumplimiento automático para todas las jurisdicciones, importación BIM completa, optimización económica, inteligencia artificial que decida por la persona ni detalle constructivo listo para emitir planos.
