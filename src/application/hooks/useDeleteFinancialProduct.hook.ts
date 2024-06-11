import { useMutation } from "@tanstack/react-query";
import { financialProductsService } from "../../core/application/services.instances";


interface UseDeleteFinancialProductHook {
    deleteFinancialProduct: (id: string) => Promise<void>;
    isDeletingFinancialProduct: boolean;
    isErrorDeletingFinancialProduct: boolean;
}

export function useDeleteFinancialProduct (): UseDeleteFinancialProductHook {
    const { mutateAsync, isError, isPending } = useMutation({
        mutationFn: async (id: string) => {
            return await financialProductsService.deleteFinancialProduct(id);
        },
    });
    const deleteFinancialProduct = async (id: string) => {
        return await mutateAsync(id);
    };
    return {
        deleteFinancialProduct,
        isDeletingFinancialProduct: isPending,
        isErrorDeletingFinancialProduct: isError
    };
}