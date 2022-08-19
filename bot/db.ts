import { Client, query } from "faunadb";

import { FaunaDbsecret } from "utils/config";

const client = new Client({
    secret: FaunaDbsecret,
    domain: "db.us.fauna.com",
});

async function add(collection: string, key: number, data: any) {
    const exists = await client.query(query.Exists(query.Ref(query.Collection(collection), key)));

    if (!exists) {
        await client.query(query.Create(query.Ref(query.Collection('news_receivers'), key), {
            data: data
        }));
    }
}

export default {
    add,
}