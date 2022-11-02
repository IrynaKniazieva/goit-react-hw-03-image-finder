import React from "react"
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";


class App extends React.Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    // console.log('Modal componentDidMount');
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