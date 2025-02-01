export interface Card {
  id: string;
  name: string;
  rarity: number;
  expansionId: string;
  packId?: string;
  from?: string;
}
