import {useState} from 'react'

const SearchBar = () => {
  const [searchFor,setSearchFor] = useState("users")
  return (
    <form className='form-group d-flex'>
        <input type="text" className='form-check p-1 text-center' placeholder='Search' name="" id="" />
        Search
        </form>
  )
}

export default SearchBar