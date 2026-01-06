import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {

  const [filterCountries, setFilterCountries] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        console.log(res.data)
        setCountries(res.data)
      })
  }, [])
  return (
    
    <>

    <p>
      find countries
      <input onChange={e => setFilterCountries(e.target.value)}/>
    </p>
    <Countries countries={countries} filter={filterCountries} setFilter={setFilterCountries}/>
    
    
    </>

    
  )
}
export default App