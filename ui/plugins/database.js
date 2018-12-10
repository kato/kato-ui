import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'
import {jsonParse, jsonStringify} from "../common/json";

const adapter = new LocalStorage('kato-ui', {
  serialize: (array) => jsonStringify(array),
  deserialize: (string) => jsonParse(string)
});
export const db = low(adapter);

export async function getDatabase() {
  //定义初始数据
  await db.defaults({headers: []}).write();

  return {
    install(Vue) {
      Vue.prototype.$db = db;
    }
  }
}
