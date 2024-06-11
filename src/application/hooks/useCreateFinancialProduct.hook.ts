import { useMutation } from "@tanstack/react-query";
import { CreateNewProductInterface, GetAllProductsResponse } from "../../domain/products.interfaces";
import { financialProductsService } from "../../core/application/services.instances";

interface UseCreateFinancialProduct {
    createNewProduct: (product: CreateNewProductInterface) => Promise<GetAllProductsResponse>;
    isLoadingCreateProduct: boolean;
    isErrorCreateProduct: boolean;
    error ?: any;
}

export function useCreateFinancialProduct(): UseCreateFinancialProduct {
    const { mutateAsync, isError, isPending, error } = useMutation({
        mutationFn: async (product: CreateNewProductInterface) => {
            return await financialProductsService.createNewFinancialProduct(product);
        },
    });

    const createNewProduct = async (product: CreateNewProductInterface): Promise<GetAllProductsResponse> => {
        return await mutateAsync(product);
    };

    return {
        createNewProduct,
        isLoadingCreateProduct: isPending,
        isErrorCreateProduct: isError,
        error
    };
}
