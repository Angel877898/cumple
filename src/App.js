import React, { useState } from 'react';
import { obtenerTarjetas } from './tarjetasData'; // Importa la función para obtener los datos del JSON
import './App.css';

function App() {
  const [cards, setCards] = useState(Array(22).fill(false)); // Array de tarjetas, inicialmente no volteadas
  const [flippedCount, setFlippedCount] = useState(0); // Contador de tarjetas volteadas
  const tarjetas = obtenerTarjetas(); // Obtiene los datos del JSON

  const flipCard = (index) => {
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
    const targetDate = new Date('2024-04-01').getTime();
    const lastFlippedDate = localStorage.getItem('lastFlippedDate');

    if (today < targetDate) {
      alert('No puedes voltear las tarjetas antes del 1 de abril de 2024.');
      return;
    }

    if (index === 22 && today !== new Date('2024-04-24').getTime()) {
      alert('La última tarjeta solo se puede abrir el 24 de abril de 2024.');
      return;
    }

    if (!lastFlippedDate || new Date(lastFlippedDate).toDateString() !== new Date().toDateString()) {
      const newCards = [...cards];
      newCards[index] = true; // Voltear la tarjeta seleccionada
      setCards(newCards);
      setFlippedCount(flippedCount + 1); // Aumentar el contador de tarjetas volteadas hoy
      localStorage.setItem('lastFlippedDate', new Date().toDateString());
    } else {
      alert('Solo se puede seleccionar una tarjeta por día.');
    }
  };

  return (
    <div className='container'>
      <h1 style={{textAlign:'center'}}>¡Feliz cumpleaños Daguito!</h1>
      <h3 style={{textAlign:'center'}}>Selecciona una tarjeta por día, la que desees, excepto la 23. No hay un orden específico.</h3>
      <div className="App" style={{marginTop:'10px'}}>
        <div className="card-container">
          {tarjetas.map((tarjeta, index) => (
            <div key={tarjeta.id} className={`card ${cards[index] ? 'flipped' : ''}`} onClick={() => flipCard(index)}>
              <div className="card-inner">
                <div className="card-front">
                  {!cards[index] && index + 1}
                </div>
                <div className="card-back">
                  {tarjeta.texto} {/* Utiliza el texto del JSON */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
