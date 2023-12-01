import Greetings from "./components/Greetings"
import Button from "./components/Button"
import Result from "./components/Result"
import { useState } from "react"

function App() {
  const [cont, setCont] = useState(0)
  function incrementa() {
    return setCont(cont + 1)
  }

  return (
    <>
      <Button handleOnClick={incrementa} type="submit" text="incrementa" />
      <Result result={cont} />
    </>
  )

}

export default App
