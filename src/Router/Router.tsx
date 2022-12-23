import React from 'react'
import {BrowserRouter,Route,Routes,Navigate,unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import HomeTemplate from '../template/HomeTemplate'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Cart from '../pages/Carts/Cart'
import Detail from '../pages/Detail/Detail'
import {AnimatePresence} from "framer-motion";
import {useLocation} from 'react-router-dom'
import ListProduct from '../pages/ListProduct/ListProduct'
import Map from '../pages/map/Map'
type Props = {}

const Routers = (props: Props) => {

    const location = useLocation()
  return (
    <AnimatePresence >
    <Routes location={location} key={location.pathname}>
      <Route path='' element={<HomeTemplate/>}>
        <Route index element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='profile' element={<Profile/>} />
        <Route path='search' element={<Search/>} />
        <Route path='carts' element={<Cart/>} />
        <Route path='map' element={<Map/>} />
        <Route path='detail'>
          <Route path=':id' element={<Detail/>}/>
        </Route>
        <Route path='listproduct'>
        <Route path=':slug' element={<ListProduct/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Route>
    </Routes>
    </AnimatePresence>
  )
}

export default Routers