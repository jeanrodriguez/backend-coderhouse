// este archivo debe destar en ell root de la application para su correcto funcionamiento

import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirnameApp = dirname(fileURLToPath(import.meta.url));
