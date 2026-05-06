"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/components/ProductCard";
import { ProductProps } from "@/components/ProductCard";


export default function Monitored(){
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function loadProducts(){
            try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

            const formatted = response.data.map((p: any) => ({
                id: p.id,
                title: p.title,
                imageUrl: p.imageUrl,
                url: p.url,
                currentPrice: p.priceHistory[0]?.priceBRL || 0,
            }));

            setProducts(formatted);

            }catch(error){
                console.error("ERRO AO CARREGAR PRODUTOS:", error);
            }finally{
                setIsLoading(false);
            }
        }
        loadProducts();
    }, [])
    return(
        <div className="space-y-6">
            <div className="text-center mb-4">
                <h1 className="text-4xl font-bold text-zinc-900"> Produtos Monitorados </h1>
                <p> Acompanhe as variações do preço em tempo real</p>
            </div>

        {isLoading ? (
            <p> Carregando seus produtos...</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.url} {...product}/>
                ))}

                {products.length === 0 && (
                <p className="col-span-full text-center py-20 text-zinc-400">
                Você ainda não está monitorando nenhum produto.
                </p>
            )}
            
            </div>
        )}
        </div>
    );
}