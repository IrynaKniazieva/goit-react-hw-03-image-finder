import React from "react"
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Button from "./Button/Button";

import axios from "axios";
// import api from "../services/api";
// import ImageGallery from "./ImageGallery/ImageGallery";


axios.defaults.baseURL = "https://pixabay.com/api/?q=cat&page=1&key=30111831-2eef1cdbdbde188a842c8e9ba&image_type=photo&orientation=horizontal&per_page=12";



class App extends React.Component {
  state = {
    images: [],
    showModal: false,
    loading: false,
    error: null,
    page: 1,
    largeImageSrc: "",
    keyWord: "",
  };

  async componentDidMount(prevProps, prevState) {

    this.setState({ loading: true });

    // if (prevProps.keyWord !== this.props.keyWords) {
    //   this.setState ({
    //     page: 1,
    //     images: []
    //   })
    // }
    try {
      // const images = api.fetchImagesWithQuery("react");
      // this.setState({ images });
      const response = await axios.get('/search?query=react');
      this.setState({
        images: response.data.hits,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  // componentDidMount() {
  // fetchImages('react').then(console.log);
  //
  // fetch('https://pixabay.com/api/?q=cat&page=1&key=30111831-2eef1cdbdbde188a842c8e9ba&image_type=photo&orientation=horizontal&per_page=12')
  // .then(res => res.json())
  // .then(images => this.setState({ images }))
  //
  // }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
  }

  // змінення від попереднього, було true стане false і навпаки
  // toggleModal = () => {
  //   this.setState(state => ({
  //     showModal: !state.showModal,
  //   }));
  // };
  
  handleFormSubmit = (keyWord) => {
    this.setState({keyWord: keyWord});
  }

  omImageClick = (largeImageURL) => {
    this.setState({largeImageSrc: largeImageURL});
  }

  render() {
    // дестректуризую
    // const { showModal } = this.state;
    const { images, loading, error } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <p>Загружаю...</p>}
        {/* {images.length > 0 && <ImageGallery images={images} />} */}
        {images.length > 0 && <ImageGallery>
          <ImageGalleryItem onClick={this.omImageClick}
            keyWord={this.state.keyWord}
            images={images} />
        </ImageGallery>}
        <Button/>
        <div>
          {/* <button type="button" onClick={this.toggleModal}>
            відкрити модалку
          </button> */}
          {/* если showModal true рендеримо модалку якщо false то ні */}
          {this.state.largeImageSrc.length > 0 && (
            <Modal >
              <img src={this.state.largeImageSrc} alt="" width="100%" height="100%"></img>
              {/* <button type="button" onClick={this.toggleModal}>
                закрити модалку
              </button> */}
            </Modal>
          )}
          {/* <ImageGallery>
          <ImageGalleryItem>
            images = {}
          </ImageGalleryItem>
        </ImageGallery> */}
        </div>
      </div>
    );
  }
};

export default App;