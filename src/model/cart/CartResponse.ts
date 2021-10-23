import ProductModel from "../product/ProductModel";

class CartResponse {
    public product: ProductModel
    public total: number
}

export default CartResponse