import './styles.css';
import { Card } from '../../components/Card/index';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  arrivalTime: string;
}

function Home() {

  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [userLogin, setUserLogin] = useState({ name: '', avatar: '' });

  const handleAddUsers = () => {
    const newUser: User = {
      name: name,
      arrivalTime: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setUsers(prevState => [...prevState, newUser]); /*prevState para pegar os valores 
    do estado anterior*/
  }

  useEffect(() => {

    async function fetchData() {
      const response = await fetch('https://api.github.com/users/ecasarotte');
      const data = await response.json()

      setUserLogin({
        name: data.name || data.login,
        avatar: data.avatar_url
      });
    }

    fetchData();

  }, []);

  return (
    <div className='container'>
      <header>
        <h1>
          Lista de presença
        </h1>

        <div>
          <strong>{userLogin.name}</strong>
          <img src={userLogin.avatar} alt="Foto de Perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Informe o nome..."
        onChange={event => setName(event.target.value)} />
      <button
        type="button"
        onClick={handleAddUsers}>
        Adicionar
      </button>

      {
        users?.map(user => {
          return <Card
            key={user.arrivalTime}
            name={user.name}
            time={user.arrivalTime} />
        })
      }

    </div>
  )
}

export default Home
