import './App.css'
import Card from './components/Card'

function App() {
  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4 '>Tailwind test</h1>
      <Card username="Ujjwal" btnText = "Click Me" />
      <Card username="Shreyas"/>
    </>
  )
}

export default App