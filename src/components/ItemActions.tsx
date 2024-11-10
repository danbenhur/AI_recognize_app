import React, { useState } from "react";
import { observer } from "mobx-react";
import styles from "../styles/ItemActions.module.css";
import { AddProductWindow } from "./AddProductWindow";
import { Product, productStore } from "../store/ProductStore";

export const ItemActions: React.FC = observer(() => {
  const [addProductWindowIsOpen, setAddProductWindowIsOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    productStore.setSearchQuery(event.target.value);
  };

  const handleAddProduct = (product: Product) => {
    productStore.addProduct(product);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    productStore.setSortBy(event.target.value as 'name' | 'creationDate');
  };

  return (
    <>
      {addProductWindowIsOpen && (
        <AddProductWindow
          onClose={() => setAddProductWindowIsOpen(false)}
          onAddProduct={handleAddProduct}
        />
      )}
      <div className={styles.actionButtonsSpacer}>
        <div className={styles.actionButtons}>
          <button onClick={() => setAddProductWindowIsOpen(true)}>Add</button>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search by product name"
              value={productStore.searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <label htmlFor="sortSelect">Sort by:</label>
          <select
            id="sortSelect"
            onChange={handleSortChange}
            value={productStore.sortBy}
          >
            <option value="name">Name</option>
            <option value="creationDate">Date</option>
          </select>
        </div>
      </div>
    </>
  );
});
