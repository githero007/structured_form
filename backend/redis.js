const { createClient } = require('redis');
const connectRedis = async () => {
    try {
        const client = createClient({
            username: 'user',
            password: 'P@ssword123',
            socket: {
                host: 'redis-18991.c282.east-us-mz.azure.redns.redis-cloud.com',
                port: 18991
            }
        });

        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();
        console.log('connected to reddis successfully');
        return client;

    } catch (error) {
        console.log(error);
    }

}
module.exports = connectRedis;