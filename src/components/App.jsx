import React from "react"
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
// import ImageGallery from "./ImageGallery/ImageGallery";
// import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import * API from 'services/api';

class App extends React.Component {
  state = {
    images: [],
    showModal: false,
    loading: false
  };

  addImage (values) {

  }

  componentDidMount() {
    // fetchImages('react').then(console.log);
    this.setState({ loading: true })
    fetch('https://pixabay.com/api/?q=cat&page=1&key=30111831-2eef1cdbdbde188a842c8e9ba&image_type=photo&orientation=horizontal&per_page=12')
    .then(res => res.json())
    .then(images => this.setState({ images }))
    .finally(() => this.setState({loading: false }));
  }

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
    return (
      <div>
        <Searchbar onSubmit={this.addMaterial}/>
        {this.state.loading && <p>Загружаю...</p>}
        {this.state.images && <div>{this.state.images.likes}</div>}
      <div>
        <button type="button" onClick={this.toggleModal}>відкрити модалку</button>
        {/* если showModal true рендеримо модалку якщо false то ні */}
        {this.state.showModal && (<Modal 
        onClose={this.toggleModal}>
          <button type="button" onClick={this.toggleModal}>закрити модалку</button>

        </Modal>)}
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