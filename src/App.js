import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
const[repositories,SetRepositories] = useState([]);

  useEffect(()=>  {
    api.get('repositories').then(response => {
      SetRepositories (response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      url: "https://wwww.novoprojeto.com.br",
      title: `Novo projeto ${Date.now()}`,
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
    });
    const repository = response.data;

    SetRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
   
    await  api.delete(`repositories/${id}`);

    const newRepo = repositories.filter(repository => repository.id !== id);

    SetRepositories([...newRepo])
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository =>    <li key={repository.id}>
       {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
