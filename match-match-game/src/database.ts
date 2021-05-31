export class Database {
  private db: IDBDatabase;

  init(dbName: string, version?: number) {
    const iDB = window.indexedDB;
    const openRequest = iDB.open(dbName, version);
    openRequest.onupgradeneeded = () => {
      const database = openRequest.result;
      const store = database.createObjectStore('frostwOw13', {
        keyPath: 'id',
        autoIncrement: true,
      });
      this.db = database;
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };
  }

  write(collection: string, data: Array<unknown>) {
    const transaction = this.db.transaction(collection, 'readwrite');
    const store = transaction.objectStore(collection);
    const res = store.add({});
    res.onsuccess = () => {
      const newRecord = { ...data, id: res.result };
      const result = store.put(newRecord);
      console.log(result);
    };
  }

  readAll(collection: string) {
    const transaction = this.db.transaction(collection, 'readonly');
    const store = transaction.objectStore(collection);
    const result = store.getAll();

    transaction.oncomplete = () => {
      console.log(result.result);
    };
    transaction.onerror = () => {
      console.log(result.error);
    };
  }

  readFiltered(collection: string, filter: (item: number | string) => boolean) {
    const transaction = this.db.transaction(collection, 'readonly');
    const store = transaction.objectStore(collection);
    const result = store.index('email').openCursor(null, 'prev');
    const resData: Array<any> = [];
    result.onsuccess = () => {
      const cursor = result.result;
      if (cursor) {
        const currentValue = cursor.value;
        if (filter(currentValue)) {
          resData.push(currentValue);
        }
        cursor.continue();
      }
    };
    transaction.oncomplete = () => {
      console.log(resData);
    };
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
