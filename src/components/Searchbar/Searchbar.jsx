import React from "react"
import styles from './Searchbar.module.css'
// import {ReactComponent as SearchIcon} from '../icons/search.svg';

class Searchbar extends React.Component {
  state = {
    webformatURL: '',
  }

  handeleNameChange = e => {
    this.setState({webformatURL: e.currentTarget.value.toLoverCase()});
  }
    render () {
        return (
            <header className={styles.searchbar}>
  <form class="form">
    <button type="submit" class="button">
        {/* <SearchIcon width="20" height="20"/> */}
      <span class="button-label">Search</span>
    </button>

    <input
      class="input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
    />
  </form>
</header>
        )
    }
}

export default Searchbar;