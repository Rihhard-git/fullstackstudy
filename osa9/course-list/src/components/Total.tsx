interface ExercisesProps {
    total: number
}

const Total = (props: ExercisesProps) => {

    return (
        <p>Number of exercises {props.total}</p>
    )

}

export default Total