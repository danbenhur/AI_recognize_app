import { Provider } from "mobx-react";
import { productStore } from "./store/ProductStore";
import styles from "../src/styles/App.module.css";
import { Header } from "./components/Header";
import { DetailsPane } from "./components/DetailsPane";
import { ProductsList } from "./components/ProductsList";
import { ItemActions } from "./components/ItemActions";


const App: React.FC = () => {
  return (
    <Provider productStore={productStore}>
      <div >
        gfdhjdgh
      </div>
    </Provider>
  );
};

export default App;
