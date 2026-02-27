import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/Trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/users");

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)

     getUsers();
  }
  

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuário</h1>
        <input placeholder="nome" name="nome" type="text" ref={inputName} />
        <input placeholder="idade" name="idade" type="number" ref={inputAge} />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              nome: <span>{user.name}</span>{" "}
            </p>
            <p>
              idade: <span>{user.age}</span>{" "}
            </p>
            <p>
              email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() =>deleteUsers(user.id)}>
            <img src={Trash} alt="trash" width="20" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
