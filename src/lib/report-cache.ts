declare global {
  var __reportCache: Map<string, any> | undefined;
}

export const reportCache: Map<string, any> =
  globalThis.__reportCache ?? (globalThis.__reportCache = new Map<string, any>());
