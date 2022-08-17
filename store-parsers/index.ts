import getNamSales from "./nam.js";
import { SaleEntity } from "./types.js";

export async function getTotalSales() {
    const totalSales: SaleEntity[] = [];

    const namSales = await getNamSales();

    return totalSales
        .concat(namSales);
} 