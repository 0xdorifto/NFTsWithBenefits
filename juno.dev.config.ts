import { defineDevConfig } from "@junobuild/config";

export default defineDevConfig(() => ({
  satellite: {
    collections: {
      db: [
        {
          collection: "demo",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
          mutablePermissions: true
        }
      ]
    }
  }
}));