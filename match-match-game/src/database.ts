export class Database {
  private db: IDBDatabase;

  constructor() {
    this.db = null;
  }

  public init(dbName: string, version?: number): Promise<IDBDatabase> {
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
      return result;
    };
  }

  public readAll(collection: string): Promise<{ [key: string]: unknown }[]> {
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
