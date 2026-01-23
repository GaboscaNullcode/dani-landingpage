import PocketBase from 'pocketbase';

const POCKETBASE_URL = 'https://pocketbase-production-a78a.up.railway.app';

// Singleton instance for server-side usage
let pb: PocketBase | null = null;

export function getPocketBase(): PocketBase {
  if (!pb) {
    pb = new PocketBase(POCKETBASE_URL);
    // Disable auto-cancellation for server-side usage
    pb.autoCancellation(false);
  }
  return pb;
}

// For client-side usage (creates new instance each time)
export function createPocketBase(): PocketBase {
  return new PocketBase(POCKETBASE_URL);
}

export { POCKETBASE_URL };
