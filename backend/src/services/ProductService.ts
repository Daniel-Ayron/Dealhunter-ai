import { ScraperService } from "./ScrapperService.js";
import { CurrencyService } from "./CurrencyService.js";
import { ProductRepository } from "../repositories/ProductRepository.js";

export class ProductService{
    private scraper = new ScraperService();
    private currency = new CurrencyService();

    async analizeProduct(url: string){
        try{
            const productData = await this.scraper.execute(url);
            const rate = await this.currency.getUSDrate();
            const priceBRL = parseFloat((productData.priceUSD * rate).toFixed(2));

            const savedProduct = await ProductRepository.save({
                title: productData.title,
                imageUrl: productData.imageUrl,
                url: url,
                priceBRL: priceBRL,
                rateUsed: rate,
            });
            return savedProduct;

    }catch(e){
        throw e;
    };
};
};