import React from "react";
import "./app.css";
import { ReposProvider } from "./store/repos";
import { Cart } from "./cart";
import { Grid } from "./grid";

function Layout() {
  return (
    <div className="app-container">
      <div className="app-grid">
        <Grid />
      </div>
      <div className="app-cart">
        <Cart />
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <ReposProvider>
        <Layout />
      </ReposProvider>
    </>
  );
}

export default App;
