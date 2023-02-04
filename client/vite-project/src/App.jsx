import React from 'react';
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
/*package contains bindings for using React Router in web applications
React Router is a lightweight, 
fully-featured routing library for the React JavaScript library. 
React Router runs everywhere that React runs; 
on the web, on the server (using node.js), and on React Native.
React Router is a standard library for routing in React. 
It enables the navigation among views of various components in a React Application, 
allows changing the browser URL, and keeps the UI in sync with the URL. */

import { logo } from './assets';
import {Home, CreatePost} from './pages';


const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex 
      justify-between items-center bg-white 
      sm:px-8 px-4 py-4 border-b border-b-
      [#e6ebf4]"> 
        <Link to="/">
          <img src={logo} alt="logo" 
          className="w-28 object-contain" />
        </Link>
        <Link to="/create-post"
        className="font-inter font-medium
        bg-[#6469ff] text-white px-4 py-2
        rounded-md">Create</Link>
      </header>
      <main className="sm:p-8 px-4 py-8
      w-full gb-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/create-post" element={<CreatePost />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App