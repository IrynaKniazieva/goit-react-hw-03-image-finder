import React from "react"
// import { ToastContainer } from "react-toastify";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import MessageError from "./MessageError/MessageError"

// import axios from "axios";
import { fetchImagesWithQuery } from "../services/API";



class App extends React.Component {
  state = {
    images: [],
    status: 'idle',
    loading: false,
    error: null,
    page: 1,
    maxImg: 12,
    query: '',
    largeImage: '',
    showButton: false,
  };

  
  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const { query, page, maxImg } = this.state;

    if (prevQuery !== query || prevPage !== page) {
      this.setState({ status: 'pending' });

      try {
        const res = await fetchImagesWithQuery(query, page);
        
        // const {
        //   data: { hits },
        // } = images;
        

        if (res.total > maxImg) {
          this.setState({ showButton: true });
        } else {
          this.setState({ showButton: false });
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...res.data.hits], status: 'resolved'
        }))
        
        // this.setState({ images: hits, status: 'resolved' });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }


  handleFormSubmit = query => {
    this.setState({ query, page: 1});
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
    const { images, error, largeImage, status } = this.state;
    // ----початок пуста сторінка----
    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <MessageError message={"Введіть назву для пошуку"}/>
          {/* <div>Введіть назву для пошуку</div> */}
        </div>
      );
    }
    // -----Спинер/загрузка-----
    if (status === 'pending') {
      return (
        <div>
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
          {/* <MessageError message={error.message} /> */}
        </div>
      );
    }
    // ----правильний запрос, все працює-----
    if (status === 'resolved') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />        
          <ImageGallery query={this.state.query}>
            <ImageGalleryItem onSelect={this.ImageClick} images={images} />
          </ImageGallery>
          {largeImage.length > 0 && (
            <Modal imageModal={largeImage} closeModal={this.onClose} />
          )}
          <Button text="Load More..." clickHandler={this.loadMore} />
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