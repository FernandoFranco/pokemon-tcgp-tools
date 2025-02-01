import Dexie, { type Table } from "dexie";
import type { Card } from "./models/card.model";
import type { Expansion } from "./models/expansion.model";
import type { Pack } from "./models/pack.model";

export class TcgpDatabase extends Dexie {
  expansions!: Table<Expansion, string>;
  packs!: Table<Pack, string>;
  cards!: Table<Card, string>;

  myCards!: Table<{ id: string }, string>;

  constructor() {
    super("database");
    this.version(1).stores({
      expansions: "id, name",
      packs: "id, name, expansionId",
      cards: "id, name, expansionId, packId",

      myCards: "id",
    });
  }
}

export const db = new TcgpDatabase();
