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
  console.log('PUT to the database.');
  const jateDb = await openDB('jate', 1); // Create a connection to the database database and version we want to use.
  const tx = jateDb.transaction('jate', 'readwrite'); // Create a new transaction and specify the database and data privileges.
  const store = tx.objectStore('jate'); // Open up the desired object store.
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 Success! Data saved to the database', result);
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll(1);
  const result = await request;
  result
    ? console.log(result.value)
    : console.log('No data found');
  return result?.value;
}

initdb();
