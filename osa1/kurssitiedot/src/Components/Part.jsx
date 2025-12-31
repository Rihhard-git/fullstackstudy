const Part = (props) => {

    console.log(props.part)
    return (

        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}
export default Part