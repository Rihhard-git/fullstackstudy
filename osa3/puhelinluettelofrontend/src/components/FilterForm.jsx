const FilterForm = ( { filterValue, setFilterValue }) => {

    return (
        <div>
            filter shown with <input value={filterValue} onChange={(e) => {
            
            return(
                setFilterValue(e.target.value)
                
            )
            }}/>
         </div>
    )

    
}

export default FilterForm