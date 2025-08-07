export function getSecretOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`value for ${key} not found in env`);
  }
  return value;
}
