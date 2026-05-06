"use client";

import axios from "axios";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import { Search, Loader2, CheckCircle2, Link2 } from "lucide-react";
import { Input } from "./ui/input";
import type { ProductProps } from "./ProductCard";

export function AddProduct() {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [newProduct, setNewProduct] = useState<ProductProps | null>(null);

    async function handleAddProduct() {
        if (!url) return;
        setIsLoading(true);
        setNewProduct(null);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
                url: url
            });
            setNewProduct(response.data);
            setUrl("");
        } catch (error: any) {
            if (error.response?.status === 409){
                alert("Atenção: Você já está monitorando esse produto!");
            }
            console.error("Erro na requisição", error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-10">
            
            <div className="bg-white p-2 rounded-2xl border shadow-xl shadow-zinc-200/50 flex items-center gap-2 group transition-all focus-within:ring-2 focus-within:ring-amber-500/20">
                <div className="pl-4 text-zinc-400">
                    <Link2 size={20} />
                </div>
                <Input
                    type="url"
                    placeholder="https://loja.com/produto-incrivel"
                    className="flex-1 border-none bg-transparent focus-visible:ring-0 text-lg py-6"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button 
                    onClick={handleAddProduct} 
                    disabled={isLoading || !url}
                    className="px-8 py-6 rounded-xl font-bold bg-zinc-900 hover:bg-zinc-800 transition-all active:scale-95"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <Search className="mr-2 h-5 w-5" />
                    )}
                    Monitorar
                </Button>
            </div>

            {newProduct && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                    <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl shadow-sm">
                        <div className="bg-emerald-500 p-1 rounded-full text-white">
                            <CheckCircle2 size={16} strokeWidth={3} />
                        </div>
                        <p className="font-medium text-sm">Excelente! O produto já está sendo monitorado.</p>
                    </div>

                    <div className="max-w-md mx-auto">
                        
                        <ProductCard
                            id={newProduct.id}
                            title={newProduct.title}
                            imageUrl={newProduct.imageUrl}
                            currentPrice={newProduct.currentPrice}
                            url={newProduct.url}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}