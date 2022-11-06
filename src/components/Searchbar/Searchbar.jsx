import React from "react"
import styles from './Searchbar.module.css'
// import {ReactComponent as SearchIcon} from '../icons/search.svg';

class Searchbar extends React.Component {
  state = {
    searchQuery: "",
  }

  handleSearchQueryChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  handleSearchQuerySubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    
  }
    render () {
        return (
            <header className={styles.searchbar}>
  <form onSubmit={this.handleSearchQuerySubmit}>
    <button type="submit" class="button">
        {/* <SearchIcon width="20" height="20"/> */}
      <span class="button-label">Search</span>
    </button>

    <input
      type="text"
      name="searchQuery"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
      value={this.state.searchQuery}
      onChange={this.handleSearchQueryChange}
      
    />
  </form>
</header>
        )
    }
}

export default Searchbar;