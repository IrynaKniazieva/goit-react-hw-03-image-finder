import React from "react"
import styles from './Searchbar.module.css'
// import {ReactComponent as SearchIcon} from '../icons/search.svg';

class Searchbar extends React.Component {
  state = {
    imagesName: '',
  }

  handleNameChange = e => {
    this.setState({imagesName: e.currentTarget.value.toLoverCase()});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ imagesName: '' });
  }
    render () {
        return (
            <header className={styles.searchbar}>
  <form onSubmit={this.handleSubmit}>
    <button type="submit" class="button">
        {/* <SearchIcon width="20" height="20"/> */}
      <span class="button-label">Search</span>
    </button>

    <input
      type="text"
      name="imageName"
      // autocomplete="off"
      // autofocus
      placeholder="Search images and photos"
      value={this.state.images}
      onChange={this.handleNameChange}
    />
  </form>
</header>
        )
    }
}

export default Searchbar;