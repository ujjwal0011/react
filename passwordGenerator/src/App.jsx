import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [Length, setLength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback((val) => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy"

    if(NumberAllowed) str += "0123456789"
    if(CharacterAllowed) str += "!@#$%^&*()-_=+[{]}\|;:'\",.<>/?"

    for(let i = 1; i <= val; i++) {
      pass += str[Math.floor(Math.random() * str.length + 1)]
    }

    setPassword(pass)
  }, [Length, NumberAllowed, CharacterAllowed, setPassword]); // for optimization 

  const copyPass = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password]);

  useEffect(() => {
    passwordGenerator(Length)
  }, [Length, NumberAllowed, CharacterAllowed, passwordGenerator]);// kuch bhi change ho toh dobara run kardo

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-red-500'>
      <div className='w-full max-w-lg bg-gray-800 text-white rounded-lg shadow-2xl p-8'>
        <h1 className='text-center text-4xl font-extrabold mb-8 tracking-wide'>
          Password Generator
        </h1>
        <div className='flex items-center shadow-md rounded-lg mb-8'>
          <input 
            type="text"
            value={Password}
            className='w-full p-3 text-gray-900 rounded-l-lg focus:ring-2 focus:ring-indigo-500 outline-none'
            placeholder='Your password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPass} className='bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-r-lg transition duration-150 ease-in-out'>
            Copy
          </button>
        </div>
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <label className='flex-grow text-lg font-medium'>Length: {Length}</label>
            <input 
              type="range"
              min={8}
              max={60}
              value={Length}
              className='w-full mx-4'
              onChange={(e) => {
                setLength(parseInt(e.target.value))
              }}
            />
          </div>
          <div className='flex items-center'>
            <input 
              type="checkbox"
              defaultChecked={NumberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
              className='mr-3 cursor-pointer h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
            />
            <label className='text-lg font-medium'>Include Numbers</label>
          </div>
          <div className='flex items-center'>
            <input 
              type="checkbox"
              defaultChecked={CharacterAllowed}
              onChange={() => {
                setCharacterAllowed((prev) => !prev)
              }}
              className='mr-3 cursor-pointer h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
            />
            <label className='text-lg font-medium'>Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
