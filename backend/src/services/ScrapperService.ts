import puppeteer from "puppeteer";

export class ScraperService{
    async execute(url:string){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

    try{
        await page.goto(url);
        await page.waitForSelector('.product-image-main', { timeout: 5000 });

        const productImage = await page.$eval(
            "body > main > div > div > div.product-gallery > img",
            (el) => (el as HTMLImageElement).src
        );

        const imageTitle = await page.$eval('.product-detail-title', el => el.textContent.trim())
        .catch(() => "produto sem titulo");

        const productUSDprice = await page.$eval(".price-value", el => {
            const usdPrice = el.textContent; 
            return parseFloat(usdPrice)
        });

        await browser.close();

        return{
            imageUrl: productImage,
            title: imageTitle,
            priceUSD: productUSDprice
        };

    }catch(e: any){
        await browser.close();
        console.error("ERRO REAL DO PUPPETEER:", e.message);
        throw new Error("Falha ao escanear o produto.");
    };
};
};

