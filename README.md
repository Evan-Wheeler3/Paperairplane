# Paper Flight: folding

`paper-flight.html` is the whole app: open it in a browser. It loads three.js r128 from cdnjs and Bricolage Grotesque from Google Fonts.

- `?free` starts without the guide.
- `?test` runs the engine tests in the page.
- `node test/run-tests.mjs` runs the same tests in Node. They come from the `<script id="engine-tests">` block.

## Layout of the file

| Script block | What it holds |
| --- | --- |
| `#engine` | DOM-free geometry: the rest-space panels, the hinge graph, `planFold`, handles and candidate lines, shaping, `getPanels3D` |
| `#engine-tests` | Unit tests for the engine |
| `#app-ui` | three.js view, pointer and keyboard input, guide, Shape tab, "Show me" and "What's it look like?" |

## Geometry for the physics step

`window.paperFlight.getPanels3D()` returns the current model. On the Shape tab that's the opened plane; otherwise it's the flat stack. `PaperEngine.getPanels3D(state, { analysis })` does the same for any state.

The result has:

- `panels[]`: `{ id, triangles, area, normal, centroid, layers }`
- `totalArea`, `massGrams` (80 gsm), `centerOfMass`, `span`

Units are millimetres. The flight frame has its origin at the centre of mass, with +y up and -z toward the nose.
