import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import ProductsRequest from "../model/product/ProductsRequest";
import ProductsResponse from "../model/product/ProductsResponse";
import ProductModel from "../model/product/ProductModel";
import {Product} from "../entities/product.entity";
import {ValidateException} from "../Exception/ValidateException";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>
    ) {}

    public async test(productRequest: ProductsRequest): Promise<ProductsResponse> {
        this.productRepo.findOne().then(result => console.log(result))
        return null
    }

    public async getProducts(productRequest: ProductsRequest): Promise<ProductsResponse> {
        console.log("function: getProducts")
        let orderBy: string = "ASC"
        let recommendList = await this.productRepo.find({where:{recommend: true}, order: {create_date : "ASC"}})
        let restList = await this.productRepo.find({where:{recommend: false}, order: {create_date : "ASC"}})
        let isQueryFail: boolean = recommendList.length === 0 || restList.length === 0
        if (isQueryFail) throw new ValidateException('data not found in DB')
        let allList = recommendList.concat(restList)
        let totalPage: number = Math.ceil(allList.length/productRequest.elementPerPage)
        if (productRequest.page > totalPage) throw new ValidateException('page exceed length')
        let startIndex: number = (productRequest.elementPerPage*productRequest.page) - productRequest.elementPerPage
        let endIndex: number
        let isFirstPage: boolean = productRequest.page === 1
        let isLastPage: boolean = productRequest.page === totalPage && !isFirstPage
        isLastPage? endIndex = startIndex + (allList.length%productRequest.elementPerPage) : endIndex = startIndex + productRequest.elementPerPage
        const rsObject: ProductsResponse = new ProductsResponse()
        console.log('startIndex: '+startIndex + 'endIndex: ' + endIndex)
        rsObject.products = this.mapProductEntityToModel(allList.slice(startIndex, endIndex))
        rsObject.page = productRequest.page
        rsObject.isFirst = isFirstPage
        rsObject.isLast = isLastPage
        return rsObject

    }
    public mapProductEntityToModel(allProductLists: Product[]): ProductModel[] {
        console.log("function: mapProductEntityToModel")
        let result: ProductModel[] = []
        allProductLists.forEach(item => {
            let productModel: ProductModel = {
                id: item.id,
                name: item.name,
                price: item.price,
                category: item.category || 0,
                stock: item.stock,
                imageUrl: item.imageUrl,
                recommend: item.recommend
            }
            result.push(productModel)
        })

        return result;
    }
}