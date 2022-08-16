import { parse } from 'node-html-parser';
import axios from 'axios';
import { SaleEntity } from './types.js';

export async function parseNam(): Promise<SaleEntity[]> {
    const res = await axios.get("https://nammakeup.com/en/prices-drop");
    const root = parse(res.data.rendered_products);
    const productList = root.querySelector('#js-product-list');
    const saleProducts = productList.querySelectorAll(".js-product-miniature");

    const sales = saleProducts.map(sp => {
        const productName = sp.querySelector("h2[itemprop='name'] > a").innerText;
        const productImage = sp.querySelector("a.product-thumbnail > img").attributes["data-src"];
        const productPrices = sp.querySelector(".product-price-and-shipping");
        const regularPrice = productPrices.querySelector(".regular-price").innerText;
        const salePrice = productPrices.querySelector(".price").innerText;
        const discount = sp.querySelector(".discount").innerText;
        const productLink = sp.querySelector("a.product-thumbnail").attributes["href"];

        return {
            productName,
            productImage,
            regularPrice,
            salePrice,
            discount,
            productLink,
        };
    });

    return sales;
};