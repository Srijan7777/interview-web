import { DsaRound } from "@/types";

declare global {
  var __roundCache: Map<string, DsaRound> | undefined;
}

export const roundCache: Map<string, DsaRound> =
  globalThis.__roundCache ?? (globalThis.__roundCache = new Map<string, DsaRound>());
