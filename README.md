# DealHunter AI 🎯🦅

O **DealHunter AI** é uma plataforma inteligente de monitoramento de preços em tempo real. O sistema permite rastrear produtos de e-commerce, visualizar o histórico de oscilação através de gráficos dinâmicos e receber feedbacks visuais precisos para a tomada de decisão de compra.

## 💻 Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

### Backend & Database
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 🚀 Instruções de Instalação

O projeto está estruturado como um monorepo. Siga os passos abaixo para configurar cada ambiente.

### 1. Backend (Node.js + Prisma + MySQL)
1. Navegue até a pasta: `cd backend`
2. Instale as dependências: `npm install`
3. Configure o seu arquivo `.env` seguindo o modelo disponível em `.env.example`.
4. **Preparação do Banco de Dados:**
   * Para criar as tabelas no seu MySQL:
       ```bash
       npx prisma migrate dev
       ```
   * Para gerar os tipos do TypeScript (Prisma Client):
       ```bash
       npx prisma generate
       ```
5. Inicie o servidor:
   ```bash
   npm run dev

 ### 2. Frontend (Next.js + ShadcnUI + TailwindCSS)
1. Navegue até a pasta: `cd frontend`
2. Instale as dependências: `npm install`
3. Configure o seu arquivo `.env` seguindo o modelo disponível em `.env.example`.
4. Inicie a aplicação:
   ```bash
   npm run dev
   ````
---

## 🕹️ Guia de Uso (Como Testar)

Para testar as funcionalidades de rastreio e captura de dados do **DealHunter AI**, siga estes passos:

1. Acesse o site de testes: [Fake eCommerce](https://fake-ecommerce-five.vercel.app/)
2. Clique em qualquer produto da vitrine para abrir os detalhes.
3. Copie a **URL completa** gerada na barra de endereços do seu navegador.
4. No painel principal do **DealHunter AI**, cole a URL no campo de entrada e clique no botão **Monitorar**.
5. O sistema irá processar o link, extrair as informações e começar a gerar o seu histórico de preços!

---
## 📝 Resumo do Desenvolvedor

### 🏛️ Desafios no Backend:
No desenvolvimento do backend, o maior desafio técnico residiu na gestão do **Prisma ORM**. Devido às mudanças significativas entre as versões da ferramenta, enfrentei conflitos de configuração e instalação que exigiram uma análise profunda da documentação oficial para garantir a estabilidade do sistema. Além disso, a natureza volátil do web scraping exigiu refatorações constantes sempre que a estrutura do e-commerce alvo era alterada, quebrando a captura dos dados. 

### 🎨 Desafios no Frontend:
Aqui o desafio principal foi a transição do React tradicional para o **Next.js 15** , que apesar das peculiaridades, trouxe uma curva de aprendizado interessante, especialmente na compreensão de como o Next lida com rotas e renderização do lado do servidor (SSR). Na parte estética, o desafio foi dominar o sistema de múltiplas classes do **Tailwind CSS**, que embora ofereça agilidade, exige uma organização rigorosa para manter a manutenibilidade do código.

### 💡 Estratégias e Aprendizado
Para superar esses obstáculos, adotei uma postura de **estudo autodidata**, utilizando majoritariamente documentações técnicas oficiais, fóruns da comunidade e tutoriais avançados em plataformas como o YouTube. A estratégia de desenvolvimento foi baseada em **testes constantes com logs**, especialmente no backend, para rastrear o fluxo de dados em tempo real. Além disso, utilizei o **Gemini** como um guia de codificação, o qual me auxiliou na organização de tarefas complexas e nas pesquisas em relação ao projeto.