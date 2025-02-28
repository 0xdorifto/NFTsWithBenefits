import { defineDevConfig } from "@junobuild/config";

export default defineDevConfig(() => ({
  satellite: {
    collections: {
      db: [
        {
          collection: "agents",
          read: "public" as const,
          write: "public" as const,
          memory: "stable" as const,
          mutablePermissions: true
        }
      ]
    }
  }
}));