import React, { createContext, useContext, useReducer } from 'react';
import { searchGithub } from '../services';

export type Result = {
  id: number;
  url: string;
  full_name: string;
  language: string;
  stars: number;
};

export type Term = string;

type ActionAddResults = {
  type: 'add results';
  payload: {
    term: Term;
    results: Result[];
    total_count: number;
    page: number;
  };
};

type Action = ActionAddResults;

type Dispatch = (action: Action) => void;

type State = {
  term: Term;
  results: Result[];
  total_count: number;
  page: number;
};

type CartProviderProps = { children: React.ReactNode };

const initialState: State = {
  term: '',
  results: [],
  total_count: 0,
  page: 1,
};

const ResultsContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function resultsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'add results': {
      const {
        payload: { term, results, total_count, page },
      } = action;

      return {
        ...state,
        term,
        results: page > 1 ? [...state.results, ...results] : [...results],
        total_count,
        page,
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

function useResults() {
  const context = useContext(ResultsContext);

  if (context === undefined) {
    throw new Error(`useResults must be used within a ReposProvider`);
  }

  return context;
}

async function doSearchRepos({
  dispatch,
  term,
  page = 1,
}: {
  dispatch: Dispatch;
  term: string;
  page?: number;
}) {
  try {
    const { items, total_count } = await searchGithub(term, page);

    dispatch({
      type: 'add results',
      payload: {
        term,
        results: items.map(({ id, url, full_name, language, stars }) => ({
          id,
          url,
          full_name,
          language,
          stars,
        })),
        total_count,
        page,
      },
    });
  } catch (error) {
    // dispatch({type: 'fail update', error})
  }
}

export { ResultsProvider, useResults, doSearchRepos };
