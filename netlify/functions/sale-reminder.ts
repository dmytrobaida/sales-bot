import { Handler } from "@netlify/functions";
import { SaleController } from "controllers";

export const handler: Handler = async (event, context) => {
    try {
        console.log("------Start sending sale update!------");

        await new SaleController().sendSaleUpdates();

        return {
            statusCode: 200,
        };
    }
    catch (err) {
        console.log("------Error when sending sale update!------");
        console.log(err.toString());

        return {
            statusCode: 500,
            body: err.toString(),
        };
    }
};