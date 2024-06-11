import BankApiURL from "../../core/application/api";
import { CreateNewProductInterface, GetAllProductsResponse } from "../../domain/products.interfaces";


export class FinancialProductsService {


    async getAllFinancialProducts(): Promise<GetAllProductsResponse[]> {
        try {
            const resp = await BankApiURL.get<GetAllProductsResponse[]>(`/bp/products`);
            return resp?.data;
        } catch (error: any) {
            throw new Error(error);
        }
    };

    async createNewFinancialProduct(body: CreateNewProductInterface): Promise<GetAllProductsResponse> {
        try {
            const resp = await BankApiURL.post<GetAllProductsResponse>(`/bp/products`, body);
            return resp?.data;
        
        } catch (error: any) {
            
            throw new Error(error);
        }

    };

    async updateFinancialProduct( body: CreateNewProductInterface): Promise<GetAllProductsResponse> {
        try {
            const resp = await BankApiURL.put<GetAllProductsResponse>(`/bp/products`, body);
            return resp?.data;
        } catch (error: any) {
            throw new Error(error);
        }
    };


    async deleteFinancialProduct(id: string): Promise<void> {
        try {
            await BankApiURL.delete(`/bp/products?id=${id}`);
        } catch (error: any) {
            throw new Error(error);
        }
    }


}