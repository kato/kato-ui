import {Kato} from 'kato-server';
import {KatoUI} from '../middleware'

(async () => {
    const kato = new Kato();
    kato.use(KatoUI);
    await kato.listen(3000);
    console.log('listening on 3000...');
})();