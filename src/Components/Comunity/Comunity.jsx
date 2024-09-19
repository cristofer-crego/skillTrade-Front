import React, { useContext } from 'react'
import { AppContext } from '../appContext/AppContext'
import UserCard from '../HomeSections/userCard/UserCard';
import { NavHeader } from '../../Screens';
import './Comunity.css'

const Comunity = () => {

    const {userData, setUserData} = useContext(AppContext);
  return (
    <>
    <NavHeader/>
    <section className="SectionUserCards" style={{marginTop:'3rem'}}>
    <h3 className='comunity-title'>Explora y conecta con los miembros que hacen <br /> nuestra comunidad increíble</h3>
    <div className="SectionUserCards-container">
      {userData?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  </section>
  </>
  )
}

export default Comunity