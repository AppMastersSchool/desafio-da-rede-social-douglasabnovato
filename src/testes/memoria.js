import { Storage } from "../storage.js";

/** Storage sobre um armazenamento em memória, para testes isolados. */
export function storageEmMemoria(inicial = {}) {
  const dados = { ...inicial };
  const area = {
    getItem: (k) => (k in dados ? dados[k] : null),
    setItem: (k, v) => { dados[k] = String(v); },
  };
  return new Storage(area);
}
