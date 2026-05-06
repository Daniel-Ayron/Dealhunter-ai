import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export interface SaveProduct{
    title: string,
    imageUrl: string,
    url: string,
    priceBRL: number,
    rateUsed: number,
}

export const ProductRepository = {
    async save(data: SaveProduct) {
        let product = await prisma.product.findUnique({
            where: { url: data.url },
        });

        if (!product) {
            product = await prisma.product.create({
                data: {
                    title: data.title,
                    imageUrl: data.imageUrl,
                    url: data.url,
                }
            });
        }

        await prisma.priceHistory.create({
            data: {
                priceBRL: data.priceBRL,
                rateUsed: data.rateUsed,
                product: {
                    connect: { id: product.id }
                }
            }
        });

        return {
            ...product,
            currentPrice: data.priceBRL
        };
    },

    async findAll() {
        return await prisma.product.findMany({
            include: {
                priceHistory: {
                    orderBy: { capturedAt: 'desc' },
                    take: 1
                }
            }
        });
    },

    async findByUrl(url: string){
        return await prisma.product.findUnique({
            where: { url }
        });
    },

    async productDetails(id: string) {
        return await prisma.product.findUnique({
            where: { id },
            include: {
                priceHistory: {
                    orderBy: { capturedAt: 'asc' }
                }
            }
        });
    },

    async deleteProduct(id: string) {
        return await prisma.product.delete({
            where: {id}
        });
    }
};