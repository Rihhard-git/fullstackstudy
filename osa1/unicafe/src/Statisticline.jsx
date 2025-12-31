const Statisticline = ( props ) => {

    return (
        <tbody>
            <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
            </tr>
        </tbody>     
    )
}

export default Statisticline