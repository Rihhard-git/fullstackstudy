import Statisticline from "./Statisticline"

const Statistics = (props) => {
    const good = props.statistics.good
    const neutral = props.statistics.neutral
    const bad = props.statistics.bad
    const total = good+bad+neutral



    if(total != 0) {
        return (       
        
        <table>
            <Statisticline text="good" value={good} />
            <Statisticline text="neutral" value={neutral} />
            <Statisticline text="bad" value={bad} />
            <Statisticline text="all" value={total} />
            <Statisticline text="average" value={(good-bad)/total} />
            <Statisticline text="positive" value={good/total} />
        </table>
       
              
    )
    } else {
        return (         
            <p>No feedback given</p>           
        )
    }
}

export default Statistics