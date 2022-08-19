import { Client, query } from "faunadb";

import { FaunaDbsecret } from "utils/config";
import { DbCollection } from "./types";

const client = new Client({
    secret: FaunaDbsecret,
    domain: "db.us.fauna.com",
});

async function add(collection: DbCollection, key: number, data: any) {
    const exists = await client.query(query.Exists(query.Ref(query.Collection(collection), key)));

    if (!exists) {
        await client.query(query.Create(query.Ref(query.Collection(collection), key), {
            data: data
        }));
    }

    return !exists;
}

export default {
    add,
}