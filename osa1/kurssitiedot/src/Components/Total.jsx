const Total = (props) => {

    const data = props.parts

    return (
        <>
        <p>Tehtäviä yhteensä {
        props.parts[0].exercises
        +
        props.parts[1].exercises
        +
        props.parts[2].exercises}
        </p>
        </>
    )
}

export default Total