import React from "react"
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import axios from "axios";
// import api from "../services/api";
// import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

axios.defaults.baseURL = "https://pixabay.com/api/?q=cat&page=1&key=30111831-2eef1cdbdbde188a842c8e9ba&image_type=photo&orientation=horizontal&per_page=12";



class App extends React.Component {
  state = {
    images: [],
    showModal: false,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
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
  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    // дестректуризую
    // const { showModal } = this.state;
    const { images, loading, error } = this.state;
    return (
      <div>
        <Searchbar/>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <p>Загружаю...</p>}
        {/* {images.length > 0 && <ImageGallery images={images} />} */}
        {images.length > 0 && <ImageGallery>
          <ImageGalleryItem images={images} />
        </ImageGallery>}

        <div>
          <button type="button" onClick={this.toggleModal}>
            відкрити модалку
          </button>
          {/* если showModal true рендеримо модалку якщо false то ні */}
          {this.state.showModal && (
            <Modal onClose={this.toggleModal}>
              <button type="button" onClick={this.toggleModal}>
                закрити модалку
              </button>
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