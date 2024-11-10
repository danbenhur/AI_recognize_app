import { observer } from "mobx-react";
import styles from "../styles/ProductsList.module.css";
import { ProductsListItem } from "./ProductsListItem";
import { productStore } from "../store/ProductStore";

export const ProductsList: React.FC = observer(() => {

  return (
      <div className={styles.productsList}>
  
        {productStore.filteredProducts.map((product) => (
          <ProductsListItem key={product.id} product={product} />
        ))}
      </div>
  );
});
