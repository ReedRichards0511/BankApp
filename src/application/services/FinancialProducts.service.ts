import BankApiURL from "../../core/application/api";
import { GetAllProductsResponse } from "../../domain/products.interfaces";


export class FinancialProductsService {


    async getAllFinancialProducts(): Promise<GetAllProductsResponse[]> {
        try {
            const resp = await BankApiURL.get<GetAllProductsResponse[]>(`/bp/products`);
            return resp?.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }




}