import { AddProduct } from "@/components/AddProduct"

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto pt-10">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-4xl font-bold text-zinc-900">Encontre o melhor preço</h1>
        <p className="text-zinc-600">Cole o link do produto abaixo e deixe o resto conosco</p>
      </div>
      
      <AddProduct />
      
    </div>

    
  )
}
