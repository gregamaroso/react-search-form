import React, { createContext, useContext, useReducer } from 'react';
import { searchGithub } from '../services';

export type Result = {
  id: number;
  url: string;
  full_name: string;
  language: string;
  count: number;
};

export type Term = string;

type ActionAddResults = {
  type: 'add results';
  payload: {
    term: Term;
    results: Result[];
    total_count: number;
  };
};

type Action = ActionAddResults;
type Dispatch = (action: Action) => void;
type State = { term: Term; results: Result[]; total_count: number };
type CartProviderProps = { children: React.ReactNode };

const initialState: State = {
  term: '',
  results: [],
  total_count: 0,
};

const ResultsContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function resultsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'add results': {
      const {
        payload: { term, results, total_count },
      } = action;

      return {
        ...state,
        term,
        results,
        total_count,
      };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function ResultsProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(resultsReducer, initialState);
  const value = { state, dispatch };

  return (
    <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>
  );
}

function useRepos() {
  const context = useContext(ResultsContext);

  if (context === undefined) {
    throw new Error(`useRepos must be used within a ReposProvider`);
  }

  return context;
}

async function doSearchRepos(dispatch: Dispatch, term: string) {
  try {
    const { items, total_count } = await searchGithub(term);

    dispatch({
      type: 'add results',
      payload: {
        term,
        results: items.map(({ id, url, full_name, language, count }) => ({
          id,
          url,
          full_name,
          language,
          count,
        })),
        total_count,
      },
    });
  } catch (error) {
    // dispatch({type: 'fail update', error})
  }
}

export { ResultsProvider, useRepos, doSearchRepos };
