import React from 'react'
import Form from './Form';
import MyProvider from './Context/MyProvider'
import Generator from './Generator';

function Main() {
  return (
    <MyProvider>
        <Form />
        <Generator />
    </MyProvider>
  )
}

export default Main