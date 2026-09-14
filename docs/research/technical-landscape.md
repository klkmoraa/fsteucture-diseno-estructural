# Investigación técnica — FStructure Design Workbench

Fecha de corte: 2026-09-13.

## Recomendación ejecutiva

Usar TypeScript/React/Vite para la superficie interactiva, SVG para diagramas y detalles 2D, Three.js para coordinación 3D progresiva y Python como frontera de cálculo cuando el prototipo evolucione a un motor reproducible. La primera entrega debe ser 2D-first: el valor distintivo no es dibujar un modelo volumétrico, sino conectar hipótesis, resultados, acero y evidencia normativa.

## Comparación de herramientas abiertas

| Herramienta | Enfoque | Lo que aporta | Límite para FStructure | Decisión |
| --- | --- | --- | --- | --- |
| EduBeam | 2D en navegador | Flujo en vivo para vigas, armaduras y marcos; diagramas y compartir modelos; Vue/Vite/TypeScript | Orientado a análisis lineal y aprendizaje; no cubre el producto normativo de concreto/acero/presfuerzo | Referencia de interacción 2D |
| PyNite | Librería Python 3D | Marcos elásticos 3D, P-Delta, modal, placas, combinaciones, diagramas y reportes | No es un adaptador normativo completo; requiere validar cada formulación y licencia de distribución | Candidato para motor lineal/worker |
| OpenSees / OpenSeesPy | C++ con interfaz Python | Análisis no lineal, dinámico y sísmico; documentación y código públicos | Curva de aprendizaje y condiciones de licencia/redistribución; no es una UI ni un diseñador normativo | Backend avanzado opcional |
| XC | C++ con utilidades Python | FEA civil, elementos 1D/2D/3D, fibra, no linealidad y etiquetas ACI/AISC/Eurocode | Ecosistema más especializado; integración web y mantenimiento requieren trabajo | Referencia de ingeniería avanzada |
| FreeCAD FEM | Aplicación desktop | Preprocesado, malla, solver externo y postproceso en una GUI; Python/C++ | No es una base web ligera ni un sistema de diseño normativo propio | Referencia de interoperabilidad y workflow |
| IfcOpenShell | Librería IFC | Leer/crear objetos BIM y relaciones; APIs estructurales e IFC2CA | No resuelve diseño por sí sola | Capa BIM futura |
| Three.js | Render 3D web | Escena, cámara, geometría, materiales, loaders y controles | No calcula estructuras ni gestiona normas | Vista 3D posterior |

Fuentes principales:

- [EduBeam, repositorio oficial](https://github.com/janvorisek/edubeam) y [guía de introducción](https://www.edubeam.app/guide/introduction.html).
- [PyNite, repositorio oficial](https://github.com/JWock82/Pynite) y [documentación](https://pynite.readthedocs.io/en/stable/).
- [OpenSees Documentation](https://opensees.github.io/OpenSeesDocumentation/) y [repositorio](https://github.com/OpenSees/OpenSees).
- [XC, repositorio oficial](https://github.com/xcfem/xc).
- [FreeCAD FEM Workbench](https://github.com/FreeCAD/FreeCAD-documentation/blob/main/wiki/FEM_Workbench.md).
- [IfcOpenShell](https://docs.ifcopenshell.org/).
- [React](https://react.dev/learn), [Vite](https://vite.dev/) y [Three.js](https://threejs.org/manual/en/fundamentals.html).

## Lenguajes

### TypeScript

Es la opción correcta para el producto visible: ya es el lenguaje de los repos hermanos, encaja con React/Vite, permite contratos tipados entre canvas/inspector/evidencia y funciona en navegador, worker y servidor.

### Python

Es la opción correcta para la primera frontera de ingeniería: facilita unidades, álgebra, prototipos de formulaciones, comparación con libros/casos manuales y conexión con PyNite/OpenSeesPy. No debe mezclarse directamente en la UI; se comunica por un contrato versionado.

### C++ o Rust

Se reservan para una etapa posterior: solver de alto rendimiento, WebAssembly o integración con bibliotecas existentes. Introducirlos en el prototipo aumentaría el coste sin mejorar la validación del flujo de diseño.

## 2D frente a 3D

El 2D gana en la primera fase por tres razones: permite validar rápidamente el flujo de cargas y diagramas; hace visible el armado y las cotas; y reduce la superficie de errores geométricos. El 3D debe entrar como una vista coordinada que comparte el mismo modelo semántico, no como una segunda fuente de verdad.

## Normativa y documentación

Se descargan al repositorio sólo documentos públicos y autorizados, con su fuente y fecha. Los textos protegidos o de pago se enlazan, no se redistribuyen.

- [NTC Concreto CDMX 2017, SMIE](https://www.smie.org.mx/uploads/1/2022-11/normas_tecnicas_complementarias_diseno_construccion_estructuras_concreto_2017.pdf): incluye concreto simple, reforzado y presforzado.
- [NTC Acero CDMX 2020, SMIE](https://www.smie.org.mx/uploads/1/2022-11/ntc_acero_2020.pdf): estados límite de falla y servicio, acciones y requisitos de diseño de acero.
- [NTC CDMX 2017, compendio público de SMIE](https://www.smie.org.mx/uploads/1/2022-11/normas_tecnicas_complementarias_ciudad_mexico_2017.pdf) y [actualización de sismo con comentarios 2020](https://www.smie.org.mx/uploads/1/2022-11/normas_tecnicas_complementarias_diseno_sismo_2020.pdf).
- [NTC Viento CDMX 2017, SMIE](https://www.smie.org.mx/uploads/1/2022-11/normas_tecnicas_complementarias_diseno_viento_2017.pdf).
- [ACI 318 Building Code Portal](https://www.concrete.org/topicsinconcrete/318buildingcodeportal.aspx): referencia internacional; la edición actual no se incorpora sin licencia.
- [AISC 360 Current Standards](https://www.aisc.org/aisc/publications/current-standards/aisc-360/): referencia de acero; AISC publica estándares actuales descargables, sujeto a sus términos.

## Riesgos que quedan registrados

1. La normativa cambia por jurisdicción y edición; el código debe tratarla como datos versionados.
2. Un solver abierto no equivale a un diseño normativo validado.
3. Los detalles de acero y presfuerzo requieren validación de dominio, no sólo una fórmula aislada.
4. La interoperabilidad IFC debe conservar unidades, ejes, identificadores y procedencia.
5. Las licencias de OpenSeesPy, PyNite y otros componentes deben revisarse antes de distribuir un producto comercial.
