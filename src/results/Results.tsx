import React from "react";
import { useRepos } from "../store/repos";
import styles from "./Results.module.css";

type TUnrelatedProps = {
  children: JSX.Element;
};

const One = React.memo(function () {
  return <></>;
});

function Unrelated(props: TUnrelatedProps) {
  // const { state } = useRepos();

  return <>{props.children}</>;
}

export function Results() {
  const { state } = useRepos();

  return (
    <div className={styles.cart}>
      {`${state.count} items in your cart`}

      <Unrelated>
        <One />
      </Unrelated>
    </div>
  );
}

export default Results;
