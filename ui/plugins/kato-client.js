import {KatoClient} from "kato-client";

export async function getAPIClient(apiUrl) {
    const client = new KatoClient(apiUrl);
    await client.init();
    return {
        install(Vue) {
            Vue.prototype.$api = client;
        }
    }
}