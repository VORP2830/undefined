import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./App.css";
import axios from "axios";
import { resourceUsage } from "process";

interface Pokemon {
  id: number;
  name: string;
  description: string;
  type: string;
}

const api = axios.create({ baseURL: "http://localhost:5182/api/pokemon" });

function App() {
  const [showModal, setShowModal] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonId, setPokemonId] = useState(0);
  const [newPokemon, setNewPokemon] = useState<Pokemon>({
    id: 0,
    name: "",
    description: "",
    type: ""
  });

  const getPokemons = async () => {
    return await api.get('/')
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error("Erro ao buscar os pokemons:", error);
        return [];
      });
  }

  const handleSaveClick = async () => {
    try {
      if (newPokemon.id != null && newPokemon.id !== 0 && newPokemon.name && newPokemon.description && newPokemon.type) {
        await api.put(`/`, newPokemon);
        console.log("Alteração de Pokémon realizada com sucesso");
        setNewPokemon({ id: 0, name: "", description: "", type: "" });
      } else if (newPokemon.name && newPokemon.description && newPokemon.type) {
        await api.post('/', newPokemon);
        console.log("Novo Pokémon criado com sucesso");
        setNewPokemon({ id: 0, name: "", description: "", type: "" });
      }
    } catch (error) {
      console.error("Erro ao salvar o Pokémon:", error);
    }
    window.location.reload()
  };

  const handleEditClick = (pokemon: Pokemon) => {
    setNewPokemon(pokemon);
  };

  const handleConfirm = async () => {
    if (pokemonId != 0) {
      await api.delete(`/${pokemonId}`)
        .then(response => {
          console.log("Pokemon excluído com sucesso:", response);
          setPokemons(prevPokemons =>
            prevPokemons.filter(pokemon => pokemon.id !== pokemonId)
          );
        })
        .catch(error => {
          console.error("Erro ao excluir o pokemon:", error);
        });
    }
    setShowModal(false);
  };

  const handleDeleteClick = (id: number) => {
    setPokemonId(id);
    setShowModal(true);
  };

  const handleDecline = () => {
    setShowModal(false);
  }; 

  const handleClear = () => {
    setNewPokemon({ id: 0, name: "", description: "", type: "" });
  }

  useEffect(() => {
    getPokemons().then(data => {
      setPokemons(data);
    });
  }, []);

  return (
    <>
    <div className="container">

    <div className="d-flex p-3 my-3 text-white bg-secondary rounded shawdow-sm">
      <div className="d-flex align-items-center me-auto">
        <div className="lh-100">
          <h2 className="mb-0">Pokemon</h2>
        </div>
      </div>
    </div>

      <form className="my-3">
        <div className="row">
          <div className="col-md-3">
            <div className="input-group">
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Nome"
                value={newPokemon.name}
                onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })}
              />
            </div>
          </div>
          <div className="col-md-3">
            <input
              id="description"
              type="text"
              className="form-control"
              placeholder="Descrição"
              value={newPokemon.description}
              onChange={(e) => setNewPokemon({ ...newPokemon, description: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              id="type"
              type="text"
              className="form-control"
              placeholder="Tipo"
              value={newPokemon.type}
              onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-primary me-2" onClick={handleSaveClick}>
              Salvar
            </button>
            <button type="button" className="btn btn-warning" onClick={handleClear}>
              Limpar
            </button>
          </div>
        </div>
      </form>

      <table className="table tabel-striped table-hover">
        <thead className="table-dark">
          <tr className="text-center">
            <th>Nome</th>
            <th className="d-none d-md-table-cell">Descrição</th>
            <th>Tipo</th>
            <th>Operações</th>
          </tr>
        </thead>

        <tbody>
          {pokemons.map((pokemon, index) => (
            <tr key={index} className="text-center">
              <td className="border text-wrap">{pokemon.name}</td>
              <td className="border text-wrap">{pokemon.description}</td>
              <td className="border">{pokemon.type}</td>
              <td>
                <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => handleEditClick(pokemon)}>
                  Editar
                </button>
                <button type="button" className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteClick(pokemon.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
          {pokemons.length === 0 ? (
          <tfoot>
            <tr>
              <td className="text-center">
                <h4>Nenhum pokemon cadastrado</h4>
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body className="text-center">
          <p>Tem certeza que quer deletar esse pokemon?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            Sim
          </Button>
          <Button variant="secondary" onClick={handleDecline}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
