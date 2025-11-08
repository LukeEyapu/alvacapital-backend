type CopierCredential = {
  id: string;
  apiKey: string;
  apiSecret: string;
};

const copierCredentials = new Map<string, CopierCredential>();

export function addCopierCredential(id: string, apiKey: string, apiSecret: string) {
  copierCredentials.set(id, { id, apiKey, apiSecret }); // ✅ include id
}

export function getCopierCredential(id: string): CopierCredential | undefined {
  return copierCredentials.get(id);
}

export function getAllCopierCredentials(): (CopierCredential & { id: string })[] {
  return Array.from(copierCredentials.entries()).map(([id, creds]) => ({
  ...creds,
  id
}));

}

