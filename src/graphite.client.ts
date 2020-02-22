import GraphiteClient from "graphite";

const clients = {};

export function getClient(client: string | GraphiteClient): GraphiteClient {
    if (typeof client !== 'string') {
        return client;
    }

    clients[client] = clients[client] || GraphiteClient.createClient(client);

    return clients[client];
}
