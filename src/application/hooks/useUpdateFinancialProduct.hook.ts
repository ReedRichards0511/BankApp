import { useMutation } from "@tanstack/react-query";
import { CreateNewProductInterface, GetAllProductsResponse } from "../../domain/products.interfaces";
import { financialProductsService } from "../../core/application/services.instances";

interface UseUpdateFinancialProductHook {
    updateFinancialProduct: (financialProduct: GetAllProductsResponse) => Promise<GetAllProductsResponse>;
    isLoadingUpdateFinancialProduct: boolean;
    isErrorUpdateFinancialProduct: boolean;
}


export function useUpdateFinancialProduct(): UseUpdateFinancialProductHook {
    const { mutateAsync, isError, isPending, error } = useMutation({
        mutationFn: async (product: CreateNewProductInterface) => {
            return await financialProductsService.updateFinancialProduct(product);
        },
    });

    const updateFinancialProduct = async (product: CreateNewProductInterface): Promise<GetAllProductsResponse> => {
        return await mutateAsync(product);
    };

    return {
        updateFinancialProduct,
        isLoadingUpdateFinancialProduct: isPending,
        isErrorUpdateFinancialProduct: isError,
    };
}
