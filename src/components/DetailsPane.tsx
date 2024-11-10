import React, { useEffect, useState } from "react";
import styles from "../styles/DetailsPane.module.css";
import { observer } from "mobx-react";
import { Product, productStore } from "../store/ProductStore";

export const DetailsPane: React.FC = observer(() => {
  const selectedProduct = productStore.selectedProduct;
  const [productDetails, setProductDetails] = useState<Product | undefined>(selectedProduct || undefined);
  const [isValid, setIsValid] = useState(false);
  const validateInputs = (product: Product) => {
    const isValidName = product.name.trim().length > 0;
    const isValidPrice = product.price > 0;
    setIsValid(isValidName && isValidPrice);
  };

  useEffect(() => {
    if (productDetails) {
      const isValidName = productDetails.name.trim().length > 0;
      const isValidPrice = productDetails.price > 0;
      setIsValid(isValidName && isValidPrice);
    }
  }, [productDetails]);

  useEffect(() => {
    setProductDetails(selectedProduct);
  }, [selectedProduct]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (productDetails) {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productDetails) {
      productStore.updateProduct(productDetails);
    }
  };

  if (!selectedProduct) {
    return (
      <div className={styles.detailsPane}>
        <p>No product selected</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.detailsPane}>
        <div className={styles.detailsPaneTitle}>
          {selectedProduct.name} Details
        </div>
        <div className={styles.detailsPaneImage}>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
        </div>
        <form className={styles.detailsForm} onSubmit={handleSubmit}>
          <div>
            <label style={{ display: "block" }}>Name:</label>
            <input
              type="text"
              name="name"
              value={productDetails?.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.descriptionSection}>
            <label style={{ display: "block" }} htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              cols={40}
              value={productDetails?.description || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={styles.priceSection}>
            <label style={{ display: "block" }}>Price:</label>
            <input
              type="number"
              name="price"
              value={productDetails?.price || ""}
              onChange={handleInputChange}
            />
            {" $"}
          </div>
          <div className={styles.buttonSection}>
          <button type="submit" disabled={!isValid}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
});
