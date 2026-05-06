import axios from "axios";

export class CurrencyService{
    async getUSDrate(): Promise<number>{
        try{
            const awAPI = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL');

            const dolarExchange = parseFloat(awAPI.data.USDBRL.bid);

            return dolarExchange;
        }catch(e){
            throw new Error("Falha ao consultar API de câmbio!");
        };
    };
}