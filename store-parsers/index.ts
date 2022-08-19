import getNamSales from "./nam";
import { SaleEntity } from "./types";

export async function getTotalSales() {
    const totalSales: SaleEntity[] = [];

    const namSales = await getNamSales();

    return totalSales
        .concat(namSales);
} 