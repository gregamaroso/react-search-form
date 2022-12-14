import React, { createContext, useContext, useReducer } from "react";

type ActionIncrement = {
  type: "increment";
  sku_id: number;
};

type ActionDecrement = {
  type: "decrement";
  sku_id: number;
};

type Action = ActionIncrement | ActionDecrement;
type Dispatch = (action: Action) => void;
type State = { count: number };
type CartProviderProps = { children: React.ReactNode };

const ReposStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function reposReducer(state: State, action: Action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ReposProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(reposReducer, { count: 0 });
  const value = { state, dispatch };

  return (
    <ReposStateContext.Provider value={value}>
      {children}
    </ReposStateContext.Provider>
  );
}

function useRepos() {
  const context = useContext(ReposStateContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

export { ReposProvider, useRepos };
