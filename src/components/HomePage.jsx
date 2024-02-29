import React from 'react';
import MainHeader from './MainHeader';
import HomeFeed from './HomeFeed';
import AccountSettings from './AccountSettings';
import GameSettings from './GameSettings';
import ProfilePage from './ProfilePage';
import AddGameInformation from '../styles/AddGameInformation';
import Footer from './Footer';
import { Route, Routes } from 'react-router';

import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <>
        <div className='homepageWrapper'>
        <MainHeader />

            <div className='homepageContent'>
                <Routes>
                    <Route path='/' element={<HomeFeed />} />
                    <Route path='/account' element={<AccountSettings />} />
                    <Route path='/account/game-settings' element={<GameSettings />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/addgame' element={<AddGameInformation />} />

                </Routes>
            </div>

        <Footer />
        </div>

    </>
  )
}

export default HomePage