const Part = (props) => {

    const part = props.part

    return (
        <li>{part.name} {part.exercises}</li> 
    )
}
export default Part