// App.js
import { memo, useEffect } from 'react';
// import React, { useState, Component } from 'react';
import './App.css';
// import { app } from './firebase'
import { Auth } from './auth';

// alert(app)
// alert('b')

function A()
{ 
  return <div className='app'><Auth/></div>
}

export default memo(A);
