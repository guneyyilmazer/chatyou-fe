import {useState} from 'react'

const SearchBar = () => {
  const [searchFor,setSearchFor] = useState("users")
  return (
    <form className='form-group d-flex'>
        <input type="text" style={{outline:"none",background:"none"}} className='form-check text-center' placeholder='Search' name="" id="" />
        Search
        </form>
  )
}

export default SearchBar