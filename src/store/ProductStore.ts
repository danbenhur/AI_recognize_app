import { observable, action, computed, makeObservable, reaction } from "mobx";
import { initialItemsArray } from "../DummyItems";

export interface Product {
  id: number;
  name: string;
  price: number;
  creationDate: string;
  image: string;
  description?: string;
}

class ProductStore {
  @observable products: Product[] = initialItemsArray;
  @observable selectedItemId: number | null = null;
  @observable searchQuery: string = "";
  @observable sortBy: 'name' | 'creationDate' = 'name';

  constructor() {
    makeObservable(this);
  }

  @computed get selectedProduct() {
    return this.products.find((product) => product.id === this.selectedItemId);
  }

  @action
  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  @computed get filteredProducts() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return this.products; 
    }
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }

  @action
  addProduct(product: Product) {
    this.products.push(product);
  }

  @action
  removeProduct(productId: number) {
    this.products = this.products.filter((product) => product.id !== productId);
  }

  @action
  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  @action
  selectedProductId(productId: number) {
    this.selectedItemId = productId;
  }

  @action
  setSortBy(sortBy: 'name' | 'creationDate') {
    console.log(`Dan Setting sort by: ${sortBy}`);

    this.sortBy = sortBy;
    this.sortProducts(); 
  }

  @action
  sortProducts() {
    console.log(`Dan Sorting products by: ${this.sortBy}`);

    const sortBy = this.sortBy;
    this.products = this.products.slice().sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
      }
    });
    console.log('Dan Sorted products:', this.products);

  }

}

export const productStore = new ProductStore();
