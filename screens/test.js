const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://127.0.0.1:8090');

(async () => {
    const record = await pb.collection('test').getOne('8bnh3k8233zvfyn');
    console.log(record);
})();