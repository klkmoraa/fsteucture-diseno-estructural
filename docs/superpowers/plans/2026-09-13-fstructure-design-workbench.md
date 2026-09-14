# FStructure Design Workbench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un prototipo local interactivo que conecte una viga de concreto con cargas, diagramas, armado, estados de revisión y evidencia normativa, siguiendo el sistema visual de FusionStructure.

**Architecture:** React + TypeScript + Vite con un `DesignSnapshot` central. El shell de producto compone rail, canvas SVG, resultados, inspector y evidencia; las funciones de cálculo de demostración están separadas en `domain/` para poder reemplazarse después por un worker Python. SVG representa geometría y diagramas 2D; Three.js queda fuera de esta primera iteración, pero el modelo no bloquea su incorporación.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, lucide-react, SVG nativo, CSS variables derivadas del brandbook y una imagen conceptual generada para documentación/QA.

**Spec:** `docs/superpowers/specs/2026-09-13-fstructure-design-workbench-design.md`

## Global Constraints

- El prototipo se marca como experimental y no certifica cálculos ni cumplimiento normativo.
- La jurisdicción inicial es México; la interfaz debe mostrar código, edición, cláusula, unidades e hipótesis.
- El primer flujo es 2D; la vista 3D no entra en el primer corte.
- Todo número visible lleva unidad o estado explícito; no se mezclan unidades silenciosamente.
- El acento `#1AA57A` es de marca, no de resultados; los resultados usan señales semánticas del brandbook.
- Día y noche conservan geometría y semántica; el movimiento respeta `prefers-reduced-motion`.
- No se incluyen textos completos de normas protegidas; sólo se guardan documentos públicos, metadatos y enlaces autorizados.
- No se agregan dependencias de solver pesado al prototipo visual.

## File Map

- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — scaffold y scripts.
- Create: `src/main.tsx`, `src/App.tsx` — entrada y composición del producto.
- Create: `src/domain/design.ts`, `src/domain/demoDesign.ts`, `src/domain/designTransforms.ts` — tipos, snapshot inicial y transformación determinista.
- Create: `src/data/brandTokens.ts`, `src/data/references.ts` — tokens visuales y metadatos de normativa.
- Create: `src/components/AppShell.tsx`, `src/components/ProjectRail.tsx`, `src/components/Topbar.tsx` — chrome del producto.
- Create: `src/components/ModelCanvas.tsx`, `src/components/ResultStack.tsx`, `src/components/DetailSheet.tsx` — superficie de trabajo y diagramas.
- Create: `src/components/DesignInspector.tsx`, `src/components/EvidencePanel.tsx`, `src/components/StatusBadge.tsx` — edición y trazabilidad.
- Create: `src/components/icons.tsx` — glifos estructurales de la interfaz.
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/workbench.css` — tokens, accesibilidad, responsive y materia.
- Create: `src/appState.ts` — estado local y reducer pequeño.
- Create: `src/domain/designTransforms.test.ts`, `src/appState.test.tsx` — pruebas del contrato y flujo interactivo.
- Create: `public/brand/fusionstructure-mark.svg` — copia del activo de marca permitido por el brandbook.
- Create: `public/concepts/design-workbench-desktop.png` — imagen conceptual aprobada para QA y documentación.
- Create: `docs/qa/fidelity-ledger.md`, `docs/README.md`, `README.md` — handoff, verificación y límites del prototipo.

### Task 1: Scaffold the local repository

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `.gitignore`

**Interfaces:**
- Produces: Vite app runnable with `npm run dev`, buildable with `npm run build`, typechecked with `npm run typecheck`, and testable with `npm test`.

- [ ] **Step 1: Write the package manifest and scripts**

  Include React, ReactDOM, lucide-react, TypeScript, Vite, Vitest, Testing Library, jsdom, oxlint and the exact scripts `dev`, `build`, `typecheck`, `lint`, `test` and `check`.

- [ ] **Step 2: Add the Vite entry and TypeScript configuration**

  Configure a strict browser build with `src/main.tsx` importing `src/App.tsx` and the global styles.

- [ ] **Step 3: Run the empty build**

  Run: `npm install && npm run build`

  Expected: exit 0 and a generated `dist/` directory.

- [ ] **Step 4: Commit the scaffold**

  ```bash
  git add package.json index.html vite.config.ts tsconfig*.json src/main.tsx src/App.tsx .gitignore
  git commit -m "chore: scaffold design workbench"
  ```

### Task 2: Encode the domain contract and demo transformation

**Files:**
- Create: `src/domain/design.ts`
- Create: `src/domain/demoDesign.ts`
- Create: `src/domain/designTransforms.ts`
- Test: `src/domain/designTransforms.test.ts`

**Interfaces:**
- `createDemoDesign(): DesignSnapshot`
- `updateDesignInputs(snapshot: DesignSnapshot, patch: DesignInputPatch): DesignSnapshot`
- `getActiveCheck(snapshot: DesignSnapshot, id: string): DesignCheck | undefined`

- [ ] **Step 1: Write failing tests for deterministic transformation**

  Cover default snapshot, load update changing moment/shear, minimum stirrup spacing, explicit units, and preservation of reference metadata.

- [ ] **Step 2: Run the focused tests**

  Run: `npm test -- src/domain/designTransforms.test.ts`

  Expected: FAIL because the domain functions do not exist.

- [ ] **Step 3: Implement types and deterministic demo math**

  Use declared SI inputs: span in mm, distributed action in kN/m, section dimensions in mm, results in kN, kN·m, mm and mm². Keep the math illustrative and mark the snapshot `experimental`.

- [ ] **Step 4: Run the focused tests again**

  Run: `npm test -- src/domain/designTransforms.test.ts`

  Expected: PASS with all assertions green.

- [ ] **Step 5: Commit the domain contract**

  ```bash
  git add src/domain
  git commit -m "feat: add design snapshot contract"
  ```

### Task 3: Build the FusionStructure visual system

**Files:**
- Create: `src/data/brandTokens.ts`
- Create: `src/data/references.ts`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/workbench.css`
- Create: `src/components/icons.tsx`
- Create: `public/brand/fusionstructure-mark.svg`

**Interfaces:**
- `brandTokens` exposes day/night neutral surfaces, family/accent colors, semantic result colors, spacing, radii and motion durations.
- `ReferenceMeta` exposes `code`, `edition`, `clause`, `sourceUrl` and `limitations`.

- [ ] **Step 1: Copy only the canonical brand mark asset**

  Copy the existing `fusionstructure-mark.svg` from the brandbook public assets into the new project without changing its geometry.

- [ ] **Step 2: Define CSS variables and typography roles**

  Use Space Grotesk, Inter and IBM Plex Mono roles; define paper/carbon, surface, sunken, line, ink, signal colors, spacing scale and six material elevations.

- [ ] **Step 3: Implement structural icons as reusable SVG components**

  Provide model, beam, section, result, evidence, warning, check and theme icons with `currentColor`, 2 px rounded strokes and optical sizing.

- [ ] **Step 4: Add accessibility and reduced-motion rules**

  Visible focus, semantic buttons/labels, no color-only state, and a zero-duration media query for reduced motion.

- [ ] **Step 5: Run typecheck and lint**

  Run: `npm run typecheck && npm run lint`

  Expected: exit 0.

- [ ] **Step 6: Commit the visual foundation**

  ```bash
  git add src/data src/styles src/components/icons.tsx public/brand/fusionstructure-mark.svg
  git commit -m "feat: establish FusionStructure visual foundation"
  ```

### Task 4: Compose the responsive workbench shell

**Files:**
- Create: `src/components/Topbar.tsx`
- Create: `src/components/ProjectRail.tsx`
- Create: `src/components/AppShell.tsx`
- Create: `src/appState.ts`
- Modify: `src/App.tsx`
- Test: `src/appState.test.tsx`

**Interfaces:**
- `AppShell` accepts `{ snapshot, activeView, theme, onViewChange, onThemeChange, onSnapshotChange }`.
- Views are `'model' | 'results' | 'design' | 'evidence'`.

- [ ] **Step 1: Write the state transition tests**

  Assert that selecting a view, toggling theme and applying a numeric input update produce predictable state without mutating the previous snapshot.

- [ ] **Step 2: Implement the reducer and top-level shell**

  Keep `App.tsx` as composition glue. Put project name, `Experimental` state, code edition, theme control and view tabs in the topbar; put the element tree in the rail.

- [ ] **Step 3: Run the state tests**

  Run: `npm test -- src/appState.test.tsx`

  Expected: PASS.

- [ ] **Step 4: Verify responsive shell locally**

  Run: `npm run dev -- --host 127.0.0.1`

  Open the local URL at 1440 × 900, 940 × 800 and 390 × 844; verify no horizontal overflow and that the rail collapses to a compact selection control.

- [ ] **Step 5: Commit the shell**

  ```bash
  git add src/App.tsx src/appState.ts src/components/AppShell.tsx src/components/ProjectRail.tsx src/components/Topbar.tsx src/appState.test.tsx
  git commit -m "feat: add responsive workbench shell"
  ```

### Task 5: Implement model canvas, results and detail sheet

**Files:**
- Create: `src/components/ModelCanvas.tsx`
- Create: `src/components/ResultStack.tsx`
- Create: `src/components/DetailSheet.tsx`
- Modify: `src/components/AppShell.tsx`

**Interfaces:**
- `ModelCanvas` consumes `DesignSnapshot` and `activeSignal`.
- `ResultStack` consumes `DesignSnapshot` and emits `onSignalChange(signalId)`.
- `DetailSheet` consumes `DesignSnapshot` and displays section/longitudinal views.

- [ ] **Step 1: Build the SVG model canvas**

  Render supports, span, distributed load arrows, dimensions and rebar as code-native SVG. Use semantic signal colors: moment coral, shear green, deflected violet and attention amber.

- [ ] **Step 2: Build the diagram stack**

  Render axial, moment, shear, deflected and steel traces with one selected state and units. Keep axes and labels readable at 390 px.

- [ ] **Step 3: Build the detail sheet**

  Render a rectangular concrete section, cover, four longitudinal bars, closed stirrups and a longitudinal cut with spacing annotations.

- [ ] **Step 4: Wire selection and state updates**

  Selecting moment/shear/steel changes the active evidence target and highlights the corresponding geometry.

- [ ] **Step 5: Build and visually inspect**

  Run: `npm run build`; open the app and capture a 1440 px screenshot. Fix clipped labels, unreadable units, accidental card grids and inconsistent signal colors before continuing.

- [ ] **Step 6: Commit the analytical surface**

  ```bash
  git add src/components/ModelCanvas.tsx src/components/ResultStack.tsx src/components/DetailSheet.tsx src/components/AppShell.tsx
  git commit -m "feat: add structural model and result diagrams"
  ```

### Task 6: Add design inspector and evidence workflow

**Files:**
- Create: `src/components/DesignInspector.tsx`
- Create: `src/components/EvidencePanel.tsx`
- Create: `src/components/StatusBadge.tsx`
- Modify: `src/components/AppShell.tsx`

**Interfaces:**
- `DesignInspector` exposes editable span, width, depth, cover and distributed load fields.
- `EvidencePanel` accepts an active `DesignCheck` and renders source, clause, assumptions, units and limitations.

- [ ] **Step 1: Add labeled numeric inputs**

  Every input carries its unit and validates positive geometry, nonnegative cover, and finite load values; validation errors are visible next to the field.

- [ ] **Step 2: Add the evidence state**

  Show `NTC CDMX 2017 · Concreto`, clause reference, `Experimental` state, assumptions and a non-certification notice.

- [ ] **Step 3: Wire Apply and Save version actions**

  Apply transforms the snapshot and updates the canvas/diagrams/detail. Save version stores the snapshot in localStorage under a versioned key and updates the saved status.

- [ ] **Step 4: Test the core workflow**

  Use Testing Library to change load from 12.0 to 16.0 kN/m, click apply and assert the moment value and diagram path change; assert that the reference metadata stays intact.

- [ ] **Step 5: Commit the workflow**

  ```bash
  git add src/components/DesignInspector.tsx src/components/EvidencePanel.tsx src/components/StatusBadge.tsx src/components/AppShell.tsx src/domain src/appState.test.tsx
  git commit -m "feat: add design inputs and evidence trace"
  ```

### Task 7: Add concept asset, docs and project handoff

**Files:**
- Create: `public/concepts/design-workbench-desktop.png`
- Create: `docs/README.md`
- Create: `docs/qa/fidelity-ledger.md`
- Create: `README.md`

**Interfaces:**
- The README documents development, tests, limitations, normative sources and future worker boundary.
- The fidelity ledger records concept evidence, render evidence, fixes and intentional deviations.

- [ ] **Step 1: Generate the desktop concept image**

  Use the built-in Image Gen tool with the design brief: FusionStructure structural workbench, dark carbon/paper surfaces, quiet header, left project rail, central 2D beam with semantic diagrams, right evidence inspector, no invented product claims, no text baked into the UI unless readable and exact.

- [ ] **Step 2: Save the chosen concept into `public/concepts/`**

  Inspect the result, keep the selected asset in the repo, and record the prompt and role in `docs/README.md`.

- [ ] **Step 3: Write the fidelity ledger**

  Compare copy, composition, typography, palette, signal colors, material depth, responsive behavior, selected states and asset treatment. Record at least five concrete comparison points.

- [ ] **Step 4: Run the full verification gate**

  Run: `npm run check && npm run build`

  Expected: exit 0 with typecheck, lint, tests and production build passing.

- [ ] **Step 5: Commit the handoff**

  ```bash
  git add README.md docs public/concepts
  git commit -m "docs: hand off structural design workbench prototype"
  ```

### Task 8: Initialize and publish the GitHub repository

**Files:**
- Modify: `.git/config` and GitHub remote metadata only.

- [ ] **Step 1: Verify repository history and status**

  Run: `git status --short --branch && git log --oneline -5`

  Expected: clean branch with the prototype commits visible.

- [ ] **Step 2: Check available GitHub authentication**

  Try the authenticated GitHub CLI if available. If it is not installed, use an existing authenticated Git transport or leave the exact remote command in `docs/README.md`; do not invent credentials.

- [ ] **Step 3: Create or connect the remote**

  Preferred repository name: `fstructure-design-workbench` under the authenticated owner. Preserve the local source of truth if remote creation cannot be completed.

- [ ] **Step 4: Push and verify remote state**

  Run: `git remote -v && git ls-remote origin HEAD`

  Expected: the remote resolves and its HEAD matches the pushed main branch.
