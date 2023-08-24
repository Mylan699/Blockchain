import React from "react";
import "./App.css"; 
import ContratMariage from "./ContratMariage"; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Application de Contrat de Mariage</h1>
        <p>Bienvenue dans notre application de contrat de mariage sur Ethereum.</p>
        <ContratMariage /> {/* Intégrez le composant ContratMariage ici */}
      </header>
    </div>
  );
}

export default App;
