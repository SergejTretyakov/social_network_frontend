import { useState } from 'react'
import './App.css'
import {Center, Form} from "@prismane/core";
import { PRISMANE_COLORS, PrismaneProvider } from '@prismane/core';
import StartPage from './views/Start_page';
import Main_Page from './views/Main_page';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

const App = () => {
  const theme = {
    mode: "black",
  };
  return (
    <PrismaneProvider theme={theme}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<StartPage/> } />
          <Route path="/MainPage" element={<Main_Page/> } />
      </Routes>
    </BrowserRouter>
    </PrismaneProvider>
  );
  
};

export default App
