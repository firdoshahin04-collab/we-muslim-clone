import Dexie, { Table } from 'dexie';

export interface QuranAyah {
  id?: number;
  surahNumber: number;
  ayahNumber: number;
  text: string;
  translation: string;
  juz: number;
  page: number;
}

export class QuranDatabase extends Dexie {
  ayahs!: Table<QuranAyah>;

  constructor() {
    super('QuranDatabase');
    this.version(1).stores({
      ayahs: '++id, [surahNumber+ayahNumber], juz, page'
    });
  }
}

export const db_local = new QuranDatabase();
