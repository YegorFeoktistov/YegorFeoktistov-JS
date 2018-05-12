class LocalStorageSingleton {
  constructor() {
    if (!LocalStorageSingleton.Storage) {
      LocalStorageSingleton.Storage = this;
    }

    return LocalStorageSingleton.Storage;
  }

  save = (key, value) => {
    switch (key) {
      case "taskList": {
        localStorage.setItem(key, JSON.stringify(value));
        break;
      }
      case "key": {
        localStorage.setItem(key, value);
        break;
      }
      default:
        break;
    }
  };

  load = (key) => {
    let value;

    switch (key) {
      case "taskList": {
        value = JSON.parse(localStorage.getItem(key));
        break;
      }
      case "key": {
        value = localStorage.getItem(key);
        break;
      }
      default: {
        value = null;
        break;
      }
    }

    return value;
  };
}

const Storage = new LocalStorageSingleton();
Object.freeze(Storage);

export { Storage };