const Country = ( { data } ) => {

    const country = data

    console.log(country)
    const languages = Object.values(country.languages)
    console.log(languages)

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(l => {
                    return (
                        <li key={l}>{l}</li>
                    )
                }
                )}
                          
            </ul>
            <img src={country.flags.png} alt={`${country.name.common} 'flag'`}></img>
            <h2>Weather in {country.capital[0]}</h2>

        </div>
    )     
}

export default Country