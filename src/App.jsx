import './App.css'

function App() {

  function onclick (){
    window.electronAPI.closeApp()
  }



  return (
    <>
  PPOP TONW
  <button onClick={onclick}>Rage quit</button>
    </>
  )
}

export default App