// "Ab agar aap TypeScript use kar rahe ho,
// to TypeScript bolega:
// 'Property mongoose does not exist on globalThis.'
// Matlab usse ye global.mongoose samajh nahi aa raha." => => so we have to create mongoose

import { Connection } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}
export {};
