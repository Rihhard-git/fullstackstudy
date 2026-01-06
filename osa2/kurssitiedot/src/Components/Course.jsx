import Header from './Header'
import Content from './Content'

const Course = (props) => {

    const course = props.course

    const total = course.parts.map(p => p.exercises).reduce((s, e) => s + e)
    console.log(total)

    return (
        <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <b>Total exercises {total}</b>
        </>
    )
}

export default Course