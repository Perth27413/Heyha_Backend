import ProductModel from "./ProductModel";

class ProductsResponse {
    public page: number
    public isFirst: boolean
    public isLast: boolean
    public totalPage: number
    public products: ProductModel[] = []
}
export default ProductsResponse
