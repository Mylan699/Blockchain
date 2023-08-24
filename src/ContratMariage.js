import React, { Component } from "react";
import Web3 from "web3";
import ContratMariageABI from "./ContratMariage.json"; 

class ContratMariage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0607F4BE1F810f6EbA6B7D9D2D366B4dd2ca15D5", // Adresse Ethereum du compte connecté
      contratMariage: null, // Instance du contrat
      marie: false, // État du mariage
      loading: false, // Pour afficher un indicateur de chargement
    };
  }

  async componentDidMount() {
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    // Initialiser Web3.js
    const web3Bis = new Web3(Web3.givenProvider || 'ws://localhost:7545')
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Utilisez un navigateur compatible avec Ethereum !");
    }
    

    const ethereum = window.ethereum;
    console.log('window.ethereum: ', ethereum);
    const web3 = window.web3;
    console.log('web content: ', web3)
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // Charger le contrat avec l'ABI et l'adresse du contrat
    const contratMariage = new web3.eth.Contract(
      ContratMariageABI,
      "0xF340a9546C05145aA92c0B040B6453ac9B7016Ad" 
    );
    this.setState({ contratMariage });

    // Vérifier l'état du mariage
    const marie = await contratMariage.methods.marie().call();
    this.setState({ marie });
  }

  marier = async () => {
    this.setState({ loading: true });
    const { account, contratMariage } = this.state;
    
    try {
      await contratMariage.methods.marier().send({ from: account });
      this.setState({ marie: true, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  divorcer = async () => {
    this.setState({ loading: true });
    const { account, contratMariage } = this.state;
    
    try {
      await contratMariage.methods.divorcer().send({ from: account });
      this.setState({ marie: false, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { account, marie, loading } = this.state;

    return (
      <div>
        <h1>Contrat de Mariage</h1>
        <p>Adresse du compte connecté : {account}</p>
        {marie ? (
          <p>Le mariage est conclu.</p>
        ) : (
          <p>Le mariage n'est pas encore conclu.</p>
        )}
        {loading ? (
          <p>En cours de traitement...</p>
        ) : (
          <>
            {!marie && (
              <button onClick={this.marier}>Marier</button>
            )}
            {marie && (
              <button onClick={this.divorcer}>Divorcer</button>
            )}
          </>
        )}
      </div>
    );
  }
}

export default ContratMariage;
