import React from 'react';
import { observer } from 'mobx-react';
import { Product } from '../store/ProductStore';
import { productStore } from '../store/ProductStore'; 
import styles from '../styles/ProductsListItem.module.css'


export const ProductsListItem: React.FC<ProductsListItemProps> = observer(({ product }) => {
const handleProductWasClicked = () => {
productStore.selectedProductId(product.id)
}

const handleDeleteProduct = () => {
  productStore.removeProduct(product.id)
}
  
  return (
    <div className={styles.product} onClick={handleProductWasClicked}>
      <img src={product.image} alt={product.name} />
      <div className={styles.details}>
        <h2>{product.name}</h2>
      {product.description && <p>{product.description}</p>}
      </div>
      <div className={styles.deleteButton}>
          <button onClick={handleDeleteProduct}>Delete</button>
          </div>
    </div>
  );
});

interface ProductsListItemProps {
  product: Product;
}



