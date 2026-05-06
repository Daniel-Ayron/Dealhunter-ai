"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, RefreshCw, BrainCircuit, Trash2 } from "lucide-react"; 
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProductDetails(){
    const {id} = useParams();
    const router = useRouter(); 

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        async function getDetails(){
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
                setProduct(response.data);
            } catch(error) {
                console.error("Erro ao detalhar produto:", error)
            } finally {
                setIsLoading(false)
            }
        }
        if (id) getDetails();
    }, [id]);

    if (isLoading) return <div className="p-8">Carregando detalhes do produto...</div>;
    if (!product) return <div className="p-8">Produto não encontrado.</div>

    const currentPrice = product.priceHistory?.[product.priceHistory.length - 1]?.priceBRL || 0;

    const chartData = product.priceHistory.map((h: any) => ({
        data: new Date(h.capturedAt).toLocaleDateString('pt-BR'),
        price: h.priceBRL
    }));

    async function handleRefresh(){
        setIsRefreshing(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/refresh`);
            setProduct(response.data);
            toast.success("Preço atualizado com sucesso!");
        } catch(error) {
            console.error("Erro interno ao atualizar produto!", error);
            toast.error("Ocorreu um erro ao atualizar o produto.")
        } finally {
            setIsRefreshing(false);
        }
    }

    async function handleDelete(){
        const confirmDelete = confirm("Deseja realmente parar de monitorar este produto?");

        if (confirmDelete) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
                toast.success("Produto removido com sucesso!");
                router.push("/monitored"); 
            } catch (error) {
                console.error("Erro ao deletar:", error);
                toast.error("Erro ao deletar produto.");
            }
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <Link href="/monitored" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-800 transition">
                <ArrowLeft size={20} /> Voltar para monitorados
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative h-[400] bg-white rounded-2xl border flex items-center justify-center">
                    <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain p-4"
                    />
                </div>

                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-zinc-900">{product.title}</h1>
                    <div className="space-y-1">
                        <p className="text-zinc-500 text-sm">Preço Atual</p>
                        <p className="text-4xl font-black text-amber-600">
                            {currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                            <Button 
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="flex-1 py-6 font-bold" 
                                variant="default"       
                            >
                                <RefreshCw size={18} className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                                {isRefreshing ? "Atualizando..." : "Atualizar Preço"}
                            </Button>
                            
                            <a 
                                href={product.url} 
                                target="_blank" 
                                className="flex-1 border border-zinc-300 py-3 rounded-lg font-bold text-center hover:bg-zinc-50 transition flex items-center justify-center"
                            >
                                Ir para a loja
                            </a>
                        </div>

                        <Button 
                            variant="outline" 
                            onClick={handleDelete}
                            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
                        >
                            <Trash2 size={18} className="mr-2" />
                            Parar de monitorar produto
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white p-6 rounded-2xl border h-80 flex flex-col items-center justify-center text-zinc-400">
                    <h3 className="font-bold mb-4 text-zinc-800 self-start">Histórico de Preços</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis 
                                dataKey="data" 
                                tick={{fontSize: 12}} 
                                minTickGap={30}
                            />
                            <YAxis 
                                hide 
                                domain={['auto', 'auto']} 
                            />
                            <Tooltip />
                            <Line 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#f59e0b" 
                                strokeWidth={3} 
                                dot={{ r: 4, fill: "#f59e0b" }} 
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex flex-col items-center justify-center text-amber-700">
                    <BrainCircuit size={48} className="mb-2 opacity-40" />
                    <p className="text-center font-medium">Análise Inteligente</p>
                    <p className="text-xs text-center opacity-70 mt-2">
                        O DealHunter AI está processando tendências para este produto.
                    </p>
                    <p className="text-[10px] uppercase tracking-widest mt-4 font-bold opacity-50">Em breve</p>
                </div>
            </div>
        </div>
    );
}