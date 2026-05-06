import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export interface ProductProps{
    id: string,
    title: string,
    imageUrl: string,
    currentPrice: number,
    url: string
}

export function ProductCard({id, title, imageUrl, currentPrice, url}: ProductProps){
    return(
        <div >
        <Card>
            <Link href={`/products/${id}`} className="cursor-pointer">
            <CardHeader className="relative w-full h-64 bg-white overflow-hidden rounded-t-xl border-b">
                <Image 
                    src={imageUrl} 
                    alt={title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </CardHeader>
            <CardContent>
                <CardTitle>{title}</CardTitle>
                <p className="text-2xl font-bold mt-2">
                  {currentPrice?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }) ?? "Preço não disponível"}
                </p>
            </CardContent>
            </Link>
            <CardFooter>
                <a href={url}>ver na loja</a>
            </CardFooter>
        </Card>
        
        </div>
    
    )
}