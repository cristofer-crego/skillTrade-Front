import React, { useContext } from 'react'
import NavHeader from '../../Components/HomeSections/NavHeader/NavHeader'
import UserCard from '../../Components/HomeSections/userCard/UserCard';
import { AppContext } from '../../Components/appContext/AppContext';

const MatchResults = () => {
  const { acceptedUsers, setAcceptedUsers } = useContext(AppContext);
  return (
    <>
    <NavHeader/>
    <section className="SectionUserCards" style={{marginTop:'4rem'}}>
    <h3 className='comunity-title'>Tus matchs</h3>
    <div className="SectionUserCards-container">
      {acceptedUsers?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  </section>
  </>
  )
}

export default MatchResults