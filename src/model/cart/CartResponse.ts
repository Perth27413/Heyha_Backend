import ProductModel from "../product/ProductModel";

class CartResponse {
    public product: ProductModel
    public productQuantity: number
}

export default CartResponse