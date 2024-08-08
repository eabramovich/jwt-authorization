import { useContext, useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import { IUser } from './models/IUser'
import { observer } from 'mobx-react-lite'
import UserService from './services/UserService'
import { Context } from './main'

function App() {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return (
      <h3>Загрузка ...</h3>
    )
  }

  if (!store.isAuth) {
    return (
      <>
        <h1>АВТОРИЗУЙТЕСЬ</h1>
        <LoginForm/>
        <button onClick={getUsers}>Получить пользователей</button>
      </>
    )
  }

  return (
    <>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
      <h1>{store.user.isActivated ? "Пользователь активирован" : "Пользователь не активирован"}</h1>
      <button onClick={getUsers}>Получить пользователей</button>
      <button onClick={() => store.logout()}>Выйти</button>
      <h2>Пользователи</h2>
      {users.map(user => 
        <div key={user.email}>{user.email}</div>
      )}
    </>
  )
}

export default observer(App)
