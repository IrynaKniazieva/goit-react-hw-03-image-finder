import React from "react"
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";


class App extends React.Component {
  state = {
    images: null,
    showModal: false,
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true })
    fetch('https://pixabay.com/api/?q=cat&page=1&key=30111831-2eef1cdbdbde188a842c8e9ba&image_type=photo&orientation=horizontal&per_page=12')
    .then(res => res.json())
    .then(images => this.setState({ images }))
    // .finally(() => this.setState({loading: false }));
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
        <Searchbar/>
        {this.state.loading && <p>Загружаю...</p>}
        {this.state.images && <div>{this.state.images.likes}</div>}
      <div>
        <button type="button" onClick={this.toggleModal}>відкрити модалку</button>
        {/* если showModal true рендеримо модалку якщо false то ні */}
        {this.state.showModal && (<Modal 
        onClose={this.toggleModal}>
          <button type="button" onClick={this.toggleModal}>закрити модалку</button>

        </Modal>)}
      </div>
      </div>
    );
  }
};

export default App;