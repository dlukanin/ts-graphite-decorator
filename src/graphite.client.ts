import * as Graphite from 'graphite';

const clients = {};

export function getClient(client: string): any {
    if (typeof client !== 'string') {
        return client;
    }

    clients[client] = clients[client] || Graphite.createClient(client);

    return clients[client];
}
