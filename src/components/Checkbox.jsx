function Checkbox({ id, value, handleChange }) {
  return (
    <div>
        <input
            id={id} 
            type="checkbox" 
            className="flex justify-center accent-lime-600 w-6 h-6"
            value={value}
            onChange={handleChange} />
    </div>
  )
}

export default Checkbox