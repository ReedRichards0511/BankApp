import { useQuery } from "@tanstack/react-query";
import { GetAllProductsResponse } from "../../domain/products.interfaces";
import { financialProductsService } from "../../core/application/services.instances";


type UseFinancialProducstResponse = {
    financialProducts: GetAllProductsResponse[];
    isLoadingFinancialProducts: boolean;
    isErrorFinancialProducts: boolean;
    refetchFinancialProducts: () => void;
    isRefetchingFinancialProducts: boolean;
}


export function useGetFinancialProducts(): UseFinancialProducstResponse {
    const { data, isLoading, isError, refetch, isRefetching } = useQuery(
        { 
            queryKey: ['financialProducts'],
            queryFn:  async () => {
                return await financialProductsService.getAllFinancialProducts();
            } 
        }
      
    )
    return {
        financialProducts: data || [],
        isLoadingFinancialProducts: isLoading,
        isErrorFinancialProducts: isError,
        refetchFinancialProducts: refetch,
        isRefetchingFinancialProducts: isRefetching
    }
}