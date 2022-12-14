import { useRef } from 'react';
import { useRepos, doSearchRepos } from '../store/results';
import styles from './Search.module.css';

export function Search() {
  const inputRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const { dispatch } = useRepos();

  const handleInputChange = () => {
    const term = inputRef.current.value;

    if (term.length > 0) {
      buttonRef.current.removeAttribute('disabled');
    } else {
      buttonRef.current.setAttribute('disabled', '');
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    doSearchRepos(dispatch, inputRef.current.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Repositories"
        onChange={handleInputChange}
        className={styles['form-input']}
        ref={inputRef}
      />

      <button
        type="submit"
        className={styles['form-button']}
        ref={buttonRef}
        disabled
      >
        Search
      </button>
    </form>
  );
}

export default Search;
