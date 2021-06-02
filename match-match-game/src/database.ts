export class Database {
  private db: IDBDatabase;

  constructor() {
    this.db = null;
  }

  init(dbName: string, version?: number): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const iDb = window.indexedDB;
      const openRequest = iDb.open(dbName, version);
      openRequest.onupgradeneeded = () => {
        const database = openRequest.result;
        const store = database.createObjectStore(dbName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('score', 'score');
        this.db = database;
        resolve(this.db);
      };

      openRequest.onsuccess = () => {
        this.db = openRequest.result;
        resolve(this.db);
      };

      openRequest.onerror = () => {
        reject(this.db);
      };
    });
  }

  public write(collection: string, data: { [key: string]: unknown }): void {
    const transaction = this.db.transaction(collection, 'readwrite');
    const store = transaction.objectStore(collection);
    const res = store.add({});
    res.onsuccess = () => {
      const newRecord = { ...data, id: res.result };
      const result = store.put(newRecord);
    };
  }

  public readAll(collection: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(collection, 'readonly');
      const store = transaction.objectStore(collection);
      const result = store.getAll();

      transaction.oncomplete = () => {
        resolve(result.result);
      };
      transaction.onerror = () => {
        reject(result.error);
      };
    });
  }
}

// let iDb = new Database()
// iDb.init('frostwOw13')
// iDb.readAll<MyRecord>('frostwOw13').then((arr) => {
//   console.log(arr)
// })
// iDb.write<MyRecord>('frostwOw13', {
//   firstName: 'asda',
//   secondName: 'asdads',
//   email: 'asdad',
//   score: 121,
// })
// iDb.readFiltered<MyRecord>('frostwOw13', (item) => item.email.length < 6)
