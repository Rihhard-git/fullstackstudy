const Persons = ( {persons, filterValue, handleDelete }) => {



    const personsToShow = (filterValue === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
/*     const handleClick = (id) => {
        console.log('clicked button' + id)
    } */

    return (
        
        <>
        {personsToShow.map(person => {
            return (
            <div key={person.id}>
                <p key={person.name}>
                {person.name} {person.number}
                </p>
                <button type="submit" onClick={() => handleDelete(person)}>delete</button>
            </div>
                  
        )
        }
        )}
        
        </>
    )
}

export default Persons