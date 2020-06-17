import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import { IProduct as IProductDTO } from '../dtos/ICreateOrderDTO';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

interface IDictionary {
  [key: string]: Product;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customers = await this.customersRepository.findById(customer_id);

    if (!customers) {
      throw new AppError('Customer doesnt exists');
    }

    const productId = products.map(product => {
      return { id: product.id };
    });

    const foundProduct = await this.productsRepository.findAllById(productId);

    if (foundProduct.length !== productId.length) {
      throw new AppError('One or more products doesnt exists');
    }

    const productMap = Object.assign(
      {},
      ...foundProduct.map(product => {
        return { [product.id]: product };
      }),
    ) as IDictionary;

    const productQuantity = products.map(product => {
      if (product.quantity > productMap[product.id].quantity)
        throw new AppError('This product is unavailable for order');

      productMap[product.id].quantity -= product.quantity;

      return {
        product_id: product.id,
        quantity: product.quantity,
        price: productMap[product.id].price,
      } as IProductDTO;
    });

    const order = await this.ordersRepository.create({
      customer: customers,
      products: productQuantity,
    });

    await this.productsRepository.updateQuantity(foundProduct);

    return order;
  }
}

export default CreateOrderService;
