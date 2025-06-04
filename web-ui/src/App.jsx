import React from 'react'
import Header from './components/header'
import "./App.css"


function App() {


  return (
    <>
      <div>
        <Header />
        <div>
          <div className="flex justify-center items-center h-96 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="text-3xl font-bold text-slate-800">
              Welcome to Empower Illiter
            </div>
            <div>
              <button>list your service</button>
              <button>Hire a service provider</button>
            </div>
          </div>
          <div>
            <div className='w-3/4 mx-auto my-10 p-5'>
              <h2 className='font-bold text-2xl text-center mb-2'>About us</h2>
              <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos,
                  expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Vero voluptate iusto corporis consectetur sed quam laborum ab eos,
                  expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos,
                  expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos,
                  expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt!</p>
              </div>
            </div>
            <div className='w-3/4 mx-auto my-10 p-5'>
              <h2 className='font-bold text-2xl text-center mb-2'>Our mission</h2>
              <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos,
                  expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Vero voluptate iusto corporis consectetur sed quam laborum ab eos,
                  expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt!</p>
              
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
