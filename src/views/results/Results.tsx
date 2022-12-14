import React from 'react';
import type { Result } from '../../store/results';
import { useResults, doSearchRepos } from '../../store/results';
import styles from './Results.module.css';

interface IResultTableRow {
  result: Result;
}

interface IResultTable {
  total_count: number;
  results: Result[];
}

const formatStarsCount = (num: number) =>
  num >= 1000 ? `${Math.floor(num / 1000)}k` : `${num}`;

const ResultTableRow = React.memo(function ({
  result: { full_name, language, stars },
}: IResultTableRow) {
  return (
    <tr>
      <td>{full_name}</td>
      <td>{language}</td>
      <td>{formatStarsCount(stars)}</td>
    </tr>
  );
});

const ResultTable: React.FC<IResultTable> = ({
  total_count,
  results,
}: IResultTable) => (
  <>
    {total_count > 0 ? (
      <p>{`${total_count.toLocaleString()} results`}</p>
    ) : null}

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
  </>
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

  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      Load More
    </button>
  );
};

export function Results() {
  const {
    state: { total_count, results },
  } = useResults();

  return (
    <>
      {results.length > 0 ? (
        <>
          <ResultTable total_count={total_count} results={results} />
          <LoadMore />
        </>
      ) : null}
    </>
  );
}

export default Results;
