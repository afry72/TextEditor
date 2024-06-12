import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');

  // Opens jatedb
  const jateDB = await openDB('jate', 1);
  
  // Initiates with read-write access
  const tx = jateDB.transaction('jate', 'readwrite');

  // Retrieves jate
  const store = tx.objectStore('jate');

  // Creates a request
  const request = store.put({ id: 1, value: content });

  // Waits for the put operation to complete 
  const result = await request;

  // Logs a message indicating that data has been successfully saved to the database, along with the result
  console.log('data saved', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from database');

  // Opens the jatedb
  const jateDB = await openDB('jate', 1);

  // Initiates with read-only access
  const tx = jateDB.transaction('jate', 'readonly');

  // Retrieves jate
  const store = tx.objectStore('jate');

  // Creates a request
  const request = store.getAll();

  // Waits for the getAll operation to complete 
  const result = await request;

  // Logs the result obtained from the database
  console.log('result.value', result);

  // Returns the value from the getAll operation
  return result?.value;
};

initdb();
