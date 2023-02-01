import { useState } from "react"
import { FaClipboard } from "react-icons/fa"
import Checkbox from "./components/Checkbox"

function App() {
  const [options, setOptions] = useState({
    length: 8,
    upperCase: false,
    lowerCase: false,
    numbers: false,
    symbols: false,
  })
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const [warning, setWarning] = useState(false)

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target
    setOptions((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, [2000])
    }
  }

  const generate = () => {
    if (
      options.upperCase ||
      options.lowerCase ||
      options.numbers ||
      options.symbols
    ) {
      const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"]
      const lowerCaseArray = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ]
      const upperCaseArray = lowerCaseArray.join("").toUpperCase().split("")

      const allCharacters = [
        ...(options.upperCase ? upperCaseArray : []),
        ...(options.lowerCase ? lowerCaseArray : []),
        ...(options.numbers ? numbersArray : []),
        ...(options.symbols ? symbolsArray : []),
      ]

      let pass = Array(Number(options.length))
        .fill()
        .map(
          () => allCharacters[Math.floor(Math.random() * allCharacters.length)]
        )

      setPassword(pass.join(""))
    } else {
      setWarning(true)
      setTimeout(() => {
        setWarning(false)
      }, [2000])
    }
  }

  return (
    <div className="min-h-screen box-border flex flex-col justify-center items-center bg-gradient-to-br from-lime-400 to-lime-600 text-gray-200 text-xl font-domine tracking-wide">
      {copied && (
        <p className=" text-lime-900 font-bold text-3xl -mt-[4.5rem] sm:-mt-9">
          Copied to Clipboard!
        </p>
      )}
      {warning && (
        <p className=" text-lime-900 font-bold text-2xl -mt-16 sm:-mt-8">
          Please select one of options.
        </p>
      )}
      <div className="bg-lime-700 text-center px-5 rounded-md">
        <h1 className="text-4xl font-bold my-4 select-none">
          Password Generator
        </h1>
        <div className="flex justify-between w-full text-clip px-2 py-1 my-3 text-2xl font-semibold bg-lime-900 rounded-sm">
          <h3>{password}</h3>
          <div
            className="flex justify-center py-1 px-1 text-lime-600 rounded-full active:bg-lime-300"
            onClick={handleCopy}
          >
            <FaClipboard />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex justify-between select-none">
            <label htmlFor="length">Password Characters</label>
            <input
              id="length"
              type="number"
              className="bg-lime-600 rounded-sm w-12 pl-2"
              value={options.length}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center select-none">
            <label htmlFor="upperCase">Include Uppercase Letters</label>
            <Checkbox
              id="upperCase"
              value={options.upperCase}
              handleChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center select-none">
            <label htmlFor="lowerCase">Include Lowercase Letters</label>
            <Checkbox
              id="lowerCase"
              value={options.lowerCase}
              handleChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center select-none">
            <label htmlFor="numbers">Include Numbers</label>
            <Checkbox
              id="numbers"
              value={options.numbers}
              handleChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center select-none mb-5">
            <label htmlFor="symbols">Include Symbols</label>
            <Checkbox
              id="symbols"
              value={options.symbols}
              handleChange={handleChange}
            />
          </div>
        </div>
        <button
          className="bg-lime-900 rounded-full px-3 py-1 mb-5 active:bg-lime-600 select-none"
          onClick={generate}
        >
          Generate
        </button>
      </div>
    </div>
  )
}

export default App
