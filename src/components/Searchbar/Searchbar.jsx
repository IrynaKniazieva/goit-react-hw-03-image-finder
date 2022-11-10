import React from "react"
import styles from './Searchbar.module.css'
import { GoSearch } from "react-icons/go";
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
      alert("Enter a valid name");
      // toast.error("Wow so easy!");
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({query: ""});
   
    
  }
    render () {
        return (
            <header className={styles.searchbar}>
  <form className={styles.formHeader} onSubmit={this.handleSearchQuerySubmit}>
    <button className={styles.buttonHeader} type="submit">
        <GoSearch/>
      {/* <span>Search</span> */}
    </button>

    <input className={styles.inputHeader}
      type="text"
      name="query"
      autoComplete="off"
      autoFocus
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