import Country from './Country'

const Countries = ({ countries, filter, setFilter }) => {

    const countriesToShow = ( filter === '')
        ? []
        : countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))

    const handleClick = (name) => {

        console.log('clicking' , name)
        setFilter(name)


    }

    console.log(countriesToShow)
    if(countriesToShow.length > 10) {
        console.log('too many countries')
        return (
            <p>Too many matches, specify another filter</p>
        )
    } 
    
    if(countriesToShow.length === 1) {

        console.log('printin country data')
        return (
          <Country data={countriesToShow[0]} />  
        )
        
        
    }
    
    else {
        console.log('printing countries list')
        return (
            <>
            {countriesToShow.map(c => {
                return (
                    <div key={c.name.common}>
                        <p>{c.name.common}<button onClick={() => handleClick(c.name.common)}>show</button></p>                
                    </div>
                    
                )
                         
            })}
            </>
        )
    }
}
export default Countries