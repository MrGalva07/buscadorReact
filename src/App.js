
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import './styles.css'
import api from './services/api';

function App() {

  let [input, setInput] = useState('')
  let [cep,setCep] = useState({})


  async function handleSearch() {


    if (input === '') {
      alert("Preencha algum cep!")
      return;
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput= ("");
    } catch {
      alert('erro')
      setInput = ("")
    }
  }

  return (
    <div className="container">
      <h1 className='title' >Buscador CEP</h1>

      <div className="containerInput">

        <input type="text" placeholder="Digite seu CEP"
          value={input}
          onChange={(event) => setInput(event.target.value) }
        />


        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch color='#FFF' size={25} />
        </button>

      </div>
            {Object.keys(cep).length > 0 && (
            <main className='main'>
            <h2>CEP:{cep.cep}</h2>
    
            <span>Rua:{cep.logradouro}</span>
            <span>Complemento{cep.complemento} </span>
            <span>{cep.bairro} </span>
            <span>{cep.localidade}</span>
    
          </main>
    )}


    </div>
  );
}

export default App;
