import React, { useContext, useEffect } from 'react'
import context from '../context/MyContext';
import './css/languageSelector.css'

function LanguageSelector() {
  const { language, setLanguage } = useContext(context);
  
  const languages = ['en-us', 'pt-br', 'es'];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if(!savedLanguage) return setLanguage('en-us');
    if (!languages.includes(savedLanguage)) return;
    setLanguage(savedLanguage);

  }, [setLanguage]);

  const handleLanguageSelect = ({target: { value }}) => {
    localStorage.setItem('language', value);
    setLanguage(value);
  }

  return (
    <div>
      <select value={language} onChange={handleLanguageSelect} className='lang-select'>
        <option value='en-us'>
          EN-US
        </option>
        <option value='pt-br'>PT-BR</option>
        <option value='es'>ES</option>
      </select>
    </div>
  );
}

export default LanguageSelector