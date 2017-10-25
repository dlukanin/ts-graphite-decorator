const graphite = require('graphite');

const clients = {};

exports.getClient = function(client) {
    if (typeof client !== 'string') {
        return client;
    }

    clients[client] = clients[client] || graphite.createClient(client);

    return clients[client];
};