import { Storage } from "./localStorageService";

const localKey = Storage.load("key");
let key = localKey === null ? 0 : parseInt(localKey, 10);

class KeyGeneratorSingleton {
  constructor() {
    if (!KeyGeneratorSingleton.KeyGenerator) {
      KeyGeneratorSingleton.KeyGenerator = this;
    }

    return KeyGeneratorSingleton.KeyGenerator;
  }

  getKey = () => {
    const returnKey = key++;
    Storage.save("key", key);
    return returnKey;
  }

  resetKey = () => {
    key = 0;
    Storage.save("key", key);
  }
}

const KeyGenerator = new KeyGeneratorSingleton();
Object.freeze(KeyGenerator);

export { KeyGenerator };