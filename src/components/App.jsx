import React from "react"
// import { ToastContainer } from "react-toastify";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Button from "./Button/Button";

// import axios from "axios";
import { fetchImagesWithQuery } from "../services/API";
// import ImageGallery from "./ImageGallery/ImageGallery";


// axios.defaults.baseURL = "https://pixabay.com/api/?q=cat&page=1&key=30111831-2eef1cdbdbde188a842c8e9ba&image_type=photo&orientation=horizontal&per_page=12";



class App extends React.Component {
  state = {
    images: [],
    
    loading: false,
    error: null,
    page: 1,
    searchQuery: "",
    largeImage: "",

  };

  // async componentDidMount() {
  //   const response = await axios.get("/search?query=react");
  //   this.setState({ images: response.data.hits });
  // }

  async componentDidMount() {

    this.setState({ loading: true });
    try {
      const images = await fetchImagesWithQuery();
      const {data: { hits },} = images;
      this.setState({images: hits});
      
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state
    if ((prevState.searchQuery !== searchQuery) || prevState.page !== page) {
      
    }
  }


  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
  }
  
  // getImages = () => {
  //   const {page} = this.state;
  //   this.setState({
  //     loading: true,
  //   });

  //   fetchImagesWithQuery(page)
  //     .then(({ data }) => {
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...data.hits],
  //       }));
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     })
  //     .finally(() => {
  //       this.setState({
  //         loading: false,
  //       });
  //     });
   

  // }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
    // console.log(searchQuery);
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  ImageClick = (largeImageURL) => {
    this.setState({largeImage: largeImageURL});
  }

  onClose = () => {
    this.setState({
      largeImage: "",
    });
  };

  render() {
    // дестректуризую
    const { images, loading, error, largeImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <p>Загружаю...</p>}
        {images.length > 0 && (
          <ImageGallery searchQuery={this.state.searchQuery}>
            <ImageGalleryItem onSelect={this.ImageClick} images={images} />
          </ImageGallery>
        )}
         {!loading && (
              <Button text="Load More" clickHandler={this.loadMore} />
            )}
        <div>
          {largeImage.length > 0 && (
            <Modal imageModal={largeImage} closeModal={this.onClose} />
          )}
        </div>
        {/* <ToastContainer autoClose={3000}/> */}
      </>
    );
  }
};

export default App;