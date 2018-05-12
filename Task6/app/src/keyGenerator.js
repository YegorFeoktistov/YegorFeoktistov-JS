const localKey = localStorage.getItem("key");
let key = localKey === null ? 0 : parseInt(localKey, 10);
export const getKey = () => {
  key++;
  localStorage.setItem("key", key);
  return key;
}