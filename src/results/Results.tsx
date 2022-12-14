import React from 'react';
import type { Result } from '../store/results';
import { useResults, doSearchRepos } from '../store/results';
import styles from './Results.module.css';

interface IResultTableRow {
  result: Result;
}

interface IResultTable {
  results: Result[];
}

const ResultTableRow: React.FC<IResultTableRow> = ({
  result,
}: IResultTableRow) => (
  <tr>
    <td>{result.full_name}</td>
    <td>{result.language}</td>
    <td>{result.stars}</td>
  </tr>
);

const ResultTable: React.FC<IResultTable> = ({ results }: IResultTable) => (
  <table className={styles.results}>
    <thead>
      <tr>
        <td>Name</td>
        <td>Language</td>
        <td>Stars</td>
      </tr>
    </thead>
    <tbody>
      {results.map((result: Result) => (
        <ResultTableRow key={result.id} result={result} />
      ))}
    </tbody>
  </table>
);

const LoadMore = () => {
  const {
    dispatch,
    state: { term, page },
  } = useResults();

  const handleClick = () => {
    doSearchRepos({
      dispatch,
      term,
      page: page + 1,
    });
  };

  return <button onClick={handleClick}>Load More</button>;
};

export function Results() {
  const {
    state: { results },
  } = useResults();

  return (
    <>
      <ResultTable results={results} />
      <LoadMore />
    </>
  );
}

export default Results;
