import React from "react";
import { useRepos } from "../store/repos";
import "./cart.css";

type TUnrelatedProps = {
  children: JSX.Element;
};

// This comnponent is only rendered once since it uses React.memo
const One = React.memo(function () {
  console.log("Component 'One' using React.memo");

  return <></>;
});

function Unrelated(props: TUnrelatedProps) {
  const { state } = useRepos();
  console.log(`Component 'Unrelated', ${state.count} items in cart`);

  return <>{props.children}</>;
}

export function Cart() {
  const { state } = useRepos();

  return (
    <div className="cart">
      {`${state.count} items in your cart`}

      <Unrelated>
        <One />
      </Unrelated>
    </div>
  );
}

export default Cart;
