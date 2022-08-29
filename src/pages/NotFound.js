import React, { useContext } from 'react';
import Header from '../components/Header';
import context from '../context/MyContext';
import notFoundText from '../translations/pages/NotFound.json';
import './css/notFound.css'


function NotFound() {
  const { language } = useContext(context);
  
  const text = notFoundText[language];
  
  return (
    <div className="not-found-bg bg-body">
      <Header />
      <div className="not-found-text">
        {text['text']} :{"("}
      </div>
    </div>
  );
}

export default NotFound