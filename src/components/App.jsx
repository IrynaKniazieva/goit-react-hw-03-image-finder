import React from "react"
import styles from './App/App.module.css'

import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
// import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
// import MessageError from "./MessageError/MessageError"
// import { ToastContainer } from "react-toastify";
// import axios from "axios";
import { fetchImagesWithQuery } from "../services/API";



class App extends React.Component {
  state = {
    images: [],
    status: 'idle',
    loading: false,
    error: null,
    page: 1,
    query: '',
    largeImage: '',
    showButton: false,
    totalHits: 0,
  };

  
  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const { query, page } = this.state;

    if (prevQuery !== query || prevPage !== page) {
      this.setState({ status: 'pending' });

      try {
        const res = await fetchImagesWithQuery(query, page);
      
        this.setState(prevState => ({
          images: [...prevState.images, ...res.data.hits], totalHits: res.data.totalHits, query: query, status: 'resolved'
        }))
        
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }


  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: []});
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  ImageClick = largeImageURL => {
    this.setState({ largeImage: largeImageURL });
  };

  onClose = () => {
    this.setState({
      largeImage: '',
    });
  };

  render() {
    const { images, error, largeImage, status, totalHits } = this.state;
    // ----початок пуста сторінка----
    if (status === 'idle') {
      return (
        <div >
          <Searchbar onSubmit={this.handleFormSubmit} />
          {/* <MessageError message={"Введіть назву для пошуку"}/> */}
        </div>
      );
    }
    // -----Спинер/загрузка-----
    if (status === 'pending') {
      return (
        <div className={styles.app}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loader />
        </div>
      );
    }
    // ----якщо помилка-----
    if (status === 'rejected') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          
          
        </div>
      );
    }
    // ----правильний запрос, все працює-----
    if (status === 'resolved') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />  
          <ImageGallery onSelect={this.ImageClick} images={images}/>
                
          {/* <ImageGallery query={this.state.query}>
            <ImageGalleryItem onSelect={this.ImageClick} images={images} />
          </ImageGallery> */}
          {largeImage.length > 0 && (
            <Modal imageModal={largeImage} closeModal={this.onClose} />
          )}
          
          {images.length !== totalHits && (<Button text="Load More..." clickHandler={this.loadMore} />)}
          
        </div>
      );
    }   
  }
};

export default App;



// return (
    //   <>
    //     <Searchbar onSubmit={this.handleFormSubmit} />
    //     {/* <p>{this.state.searchQuery}</p> */}

    //     {error && <p>Whoops, something went wrong: {error.message}</p>}
        
    //     {loading && <p>Загружаю...</p>}
    //     {images.length > 0 && (
    //     // <p>{this.state.searchQuery}</p>
    //       <ImageGallery query={this.state.query}>
    //         <ImageGalleryItem onSelect={this.ImageClick} images={images} />
    //       </ImageGallery>
    //     )}
    //      {!loading && (
    //           <Button text="Load More" clickHandler={this.loadMore} />
    //         )}
    //     <div>
    //       {largeImage.length > 0 && (
    //         <Modal imageModal={largeImage} closeModal={this.onClose} />
    //       )}
    //     </div>
    //     {/* <ToastContainer autoClose={3000}/> */}
    //   </>
    // );


    // async componentDidUpdate(prevProps, prevState) {
    //   const prevQuery = prevState.query;
    //   const prevPage = prevState.page;
    //   const { query, page } = this.state;
  
    //   if (prevQuery !== query || prevPage !== page) {
    //     this.setState({ status: 'pending' });
  
    //     try {
    //       const images = await fetchImagesWithQuery(query, page);
    //       const {
    //         data: { hits },
    //       } = images;
    //       this.setState({ images: hits, status: 'resolved' });
    //     } catch (error) {
    //       this.setState({ error, status: 'rejected' });
    //     }
    //   }
    // }