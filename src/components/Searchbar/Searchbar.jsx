import React from "react"
import styles from './Searchbar.module.css'
// import { toast } from 'react-toastify';
// import {ReactComponent as SearchIcon} from '../icons/search.svg';

class Searchbar extends React.Component {
  state = {
    query: "",
  }

  handleSearchQueryChange = e => {
    this.setState({query: e.currentTarget.value.toLowerCase()});
    // const { name, value } = e.currentTarget;
    // this.setState({ [name]: value });
    // console.log(this.state.searchQuery);
    
  }

  handleSearchQuerySubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === "") {
      alert("Введите название картинок");
      // toast.error("Wow so easy!");
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({query: ""});
   
    
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
      name="query"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
      value={this.state.query}
      onChange={this.handleSearchQueryChange}
      
    />
  </form>
</header>
        )
    }
}

export default Searchbar;