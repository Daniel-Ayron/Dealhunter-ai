import type { Request, Response } from "express";
import { ProductService } from "../services/ProductService.js";
import { ProductRepository } from "../repositories/ProductRepository.js";

const productService = new ProductService();

export class ProductController {
    create = async (req: Request, res: Response) => {
        try {
        const { url } = req.body;

        const existingProduct = await ProductRepository.findByUrl(url); 

        if (existingProduct) {
            // Retornamos o status 409 (Conflict) indicando que já existe
            return res.status(409).json({ 
                message: "Este link já está na sua lista de monitoramento!" 
            });
        }

        const result = await productService.analizeProduct(url);

        return res.status(201).json(result);
        } catch (e: any) {
            return res.status(500).json({ error: "Erro ao processar produto", debug: e.message });
        }
    };

    list = async (req: Request, res: Response) => {
        try {
        const listedProducts = await ProductRepository.findAll(); 

        return res.json(listedProducts);
        } catch (e: any) {
        return res.status(500).json({ error: "Erro ao buscar produtos." });
        }
    };

    detail = async (req: Request, res: Response) => {
        try{
            const {id} = req.params;

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: "ID inválido ou não fornecido." });
            }
            
        const product = await ProductRepository.productDetails(id);

        if(!product){
            return res.status(404).json({error: "Produto não econtrado."});
        }

        return res.json(product);
    } catch(error: any){
        console.error("ERRO AO BUSCAR PRODUTO", error.message);
        return res.status(500).json({error: "Erro interno ao buscar produto."})
    };
   };

    refresh = async (req: Request, res: Response) => {
        try {
        const { id } = req.params;


            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: "ID inválido ou não fornecido." });
            }      
        const product = await ProductRepository.productDetails(id);

            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado." });
            }

        await productService.analizeProduct(product.url);

        const updatedProduct = await ProductRepository.productDetails(id);
        return res.json(updatedProduct);
        } catch (error: any) {
        return res.status(505).json({ error: "Falha ao atualizar preço." });
        }
    };

    delete = async(req: Request, res: Response) => {
        try{
            const {id} = req.params
           
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: "ID inválido ou não fornecido." });
            }      

            await ProductRepository.deleteProduct(id);

            return res.status(204).send()
            
        }catch(error: any){
            console.error("ERRO AO DELETAR:", error.message);
            return res.status(500).json({error: "Erro ao excluir produto."});
        }
    };
  
}