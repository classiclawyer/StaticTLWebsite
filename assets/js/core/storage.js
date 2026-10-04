// Keep selections usable when browser storage is unavailable.
const transientStorage = new Map();
function readLocal(key) {
  if (transientStorage.has(key)) return transientStorage.get(key);
  try {
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}
function writeLocal(key, value) {
  try {
    localStorage.setItem(key, value);
    transientStorage.delete(key);
  } catch (_) {
    transientStorage.set(key, value);
  }
}

export { transientStorage, readLocal, writeLocal };
