import type { CoursePart } from "../types"

interface Courses {
    courses: Array<CoursePart>
}

const Part = ({ part }: { part : CoursePart}) => {
    switch (part.kind) {
        case "background":
            return(
                <div>
                    
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    <i>{part.description}</i><br/>
                    {part.backgroundMaterial}<br/><br/>
                </div>
            )  
        case "basic":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    <i>{part.description}</i><br/><br/>
                </div>
            )   
        case "group":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    project excercises {part.groupProjectCount}<br/><br/>
                </div>
            )
        case "special":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    <i>{part.description}</i><br/>
                    required skills: {part.requirements.map(i => i+' ')}
                </div>
            )
        default:
            break;
    }
}

const Content = (props: Courses) => {

    return (
        props.courses.map(p => {
        return (
            <Part part={p} />
        )
        })
    ) 
};

export default Content