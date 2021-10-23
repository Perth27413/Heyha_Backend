import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BadRequestException, Injectable} from "@nestjs/common";
import ProductsRequest from "../model/product/ProductsRequest";
import ProductsResponse from "../model/product/ProductsResponse";
import ProductModel from "../model/product/ProductModel";
import {Product} from "../entities/product.entity";
import DataNotFoundException from "../Exception/DataNotFoundException";
import {Category} from "../entities/category.entity";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>
    ) {}

    public async getProducts(productRequest: ProductsRequest): Promise<ProductsResponse> {
        console.log("function: getProducts")
        let elementPerPage: number = productRequest.elementPerPage
        let page: number = productRequest.page
        let allList = this.fetchDataFromDB(productRequest)
        return this.populateRs(await allList, page, elementPerPage)

    }

    public async getProductById(id: number): Promise<ProductModel> {
        console.log("function: getProductById id =" + id)
        let product = await this.productRepo.findOne(id, {relations: ["category"]})
        if (product === undefined) throw new DataNotFoundException()
        return this.mapProductEntityToModel(product)
    }

    public populateRs(allList: Array<Product>, page: number, elementPerPage: number): ProductsResponse{
        let totalPage: number = Math.ceil(allList.length/elementPerPage)
        if (page > totalPage) throw new BadRequestException("Page length exceed!")
        let startIndex: number = (elementPerPage*page) - elementPerPage
        let endIndex: number
        let isFirstPage: boolean = page === 1
        let isLastPage: boolean = page === totalPage
        isLastPage? endIndex = startIndex + (allList.length%elementPerPage) : endIndex = startIndex + elementPerPage
        const rsObject: ProductsResponse = new ProductsResponse()
        rsObject.products = allList.slice(startIndex, endIndex).map(item => this.mapProductEntityToModel(item))
        rsObject.page = page
        rsObject.isFirst = isFirstPage
        rsObject.isLast = isLastPage
        rsObject.totalPage = totalPage
        return rsObject
    }

    public async fetchDataFromDB(rq: ProductsRequest){
        let recommendList
        let restList
        let categoryEntity: Category = new Category();
        let whereConditionObject = {recommend: true}
        if(rq.categoryId !== 1) whereConditionObject['category'] = rq.categoryId
        categoryEntity.id = rq.categoryId
        recommendList = await this.productRepo.find({where:whereConditionObject, relations: ["category"], order: {[rq.sortBy]: rq.orderBy}})
        whereConditionObject.recommend = false
        restList = await this.productRepo.find({where:whereConditionObject, relations: ["category"], order: {[rq.sortBy] : rq.orderBy}})
        let isQueryFail: boolean = recommendList.length === 0 && restList.length === 0
        if (isQueryFail) throw new DataNotFoundException()
        return  recommendList.concat(restList)
    }

    public mapProductEntityToModel(entity: Product): ProductModel {
        console.log("function: mapProductEntityToModel"+ " name = " + entity.name)
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price,
            category: entity.category.name,
            stock: entity.stock,
            imageUrl: entity.imageUrl,
            recommend: entity.recommend
        }
    }
}