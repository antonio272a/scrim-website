import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/MyContext';
import HomeText from '../translations/pages/Home.json';

function Home() {
  const { language } = useContext(context);
  
  const text = HomeText[language];

  return (
    <div>
      <Header />
      <main className='mt-4 text-center container'>
        <h2>{text['main-title']}</h2>
        <section>
          {text['credit-1']}
          <Link to='/profile/b453aa02-f009-4adc-b321-ad7a13a60259'>
            antonio272
          </Link>
          {text['credit-2']}
        </section>
        <section>
          <h3>{text['pages-title']}</h3>
          <div className='mt-3'>
            <h4>{text['teams-title']}</h4>
            <p>{text['teams-text']}</p>
          </div>
          <div className='mt-3'>
            <h4>{text['scrims-title']}</h4>
            <p>{text['scrims-text']}</p>
          </div>
          <div className='mt-3'>
            <h4>{text['find-teams-title']}</h4>
            <p>{text['find-teams-text']}</p>
          </div>
          <div className='mt-3'>
            <h4>{text['your-teams-title']}</h4>
            <p>{text['your-teams-text']}</p>
            <h5>{text['create-team-title']}</h5>
            <p>{text['create-team-text']}</p>
          </div>
        </section>
        <section>
          <h3>{text['suggestions-title']}</h3>
          <p>
            {text['suggestions-text']}
            <a href='https://discord.gg/r3q59gtQmYhttps://discord.gg/r3q59gtQmY'>Discord</a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;
