import { useRef } from "React";
import { useRepos } from "../store/repos";
import styles from "./Search.module.css";

interface IProduct {
  sku_id: number;
  name: string;
}

const products: IProduct[] = [
  {
    sku_id: 111,
    name: "Hair Gel",
  },
  {
    sku_id: 222,
    name: "Shampoo",
  },
  {
    sku_id: 333,
    name: "Conditioner",
  },
];

function Product({ sku_id, name }: IProduct) {
  const { dispatch } = useRepos();

  const handleClick = (): void => {
    dispatch({ type: "increment", sku_id });
  };

  return (
    <div className={styles.product}>
      <div className={styles.product__name}>{name}</div>

      <button onClick={handleClick}>Buy Now</button>
    </div>
  );
}

export function Search() {
  const inputRef = useRef(null);

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const term = inputRef.current.value;

    
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Name, language..."
        ref={inputRef}
      />

      <button className="button-primary" type="submit" onClick={handleClick}>
        Search
      </button>
    </form>
  );
}

export default Search;
