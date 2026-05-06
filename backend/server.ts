import 'dotenv/config'; 
import cors from "cors"; 
import { app } from "./app.js";

app.use(cors());
app.listen(3001, ()=>{
    console.log("Exemplo teste rodando na porta 3001!");
});