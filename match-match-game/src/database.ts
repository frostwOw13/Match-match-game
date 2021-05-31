export class Database {
  private db: IDBDatabase

  constructor() {}

  init(dbName: string, version?: number) {
    const iDB = window.indexedDB
    const openRequest = iDB.open(dbName, version)
    openRequest.onupgradeneeded = () => {
      let database = openRequest.result
      let store = database.createObjectStore('frostwOw13', {
        keyPath: 'id',
        autoIncrement: true,
      })
      this.db = database;
    }

    openRequest.onsuccess = () => {
      this.db = openRequest.result
    }
  }

  write(collection: string, data: Array<unknown>) {
    let transaction = this.db.transaction(collection, 'readwrite')
    let store = transaction.objectStore(collection)
    let res = store.add({})
    res.onsuccess = () => {
      res.result;
      let newRecord = {...data, id: res.result};
      let result = store.put(newRecord);
      console.log(result);

    }
  }

  readAll(collection: string) {
    let transaction = this.db.transaction(collection, 'readonly')
    let store = transaction.objectStore(collection)
    let result = store.getAll()

    transaction.oncomplete = () => {
      console.log(result.result)
    }
    transaction.onerror = () => {
      console.log(result.error)
    }
  }

  readFiltered(
    collection: string,
    filter: (item: number | string) => boolean
  ) {
    let transaction = this.db.transaction(collection, 'readonly')
    let store = transaction.objectStore(collection)
    let result = store.index('email').openCursor(null, 'prev')
    let resData: Array<any> = []
    result.onsuccess = () => {
      let cursor = result.result
      if (cursor) {
        let currentValue = cursor.value
        if (filter(currentValue)) {
          resData.push(currentValue)
        }
        cursor.continue()
      }
    }
    transaction.oncomplete = () => {
      console.log(resData)
    }
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
