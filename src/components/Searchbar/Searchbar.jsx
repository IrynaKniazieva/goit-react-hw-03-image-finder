import React from "react"
import styles from './Searchbar.module.css'
// import { toast } from 'react-toastify';
// import {ReactComponent as SearchIcon} from '../icons/search.svg';

class Searchbar extends React.Component {
  state = {
    searchQuery: "",
  }

  handleSearchQueryChange = e => {
    this.setState({searchQuery: e.currentTarget.value.toLowerCase()});
    // const { name, value } = e.currentTarget;
    // this.setState({ [name]: value });
    // console.log(this.state.searchQuery);
    
  }

  handleSearchQuerySubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === "") {
      alert("Введите название картинок");
      // toast.error("Wow so easy!");
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({searchQuery: ""});
   
    
  }
    render () {
        return (
            <header className={styles.searchbar}>
  <form onSubmit={this.handleSearchQuerySubmit}>
    <button type="submit" class="button">
        {/* <SearchIcon width="20" height="20"/> */}
      <span>Search</span>
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