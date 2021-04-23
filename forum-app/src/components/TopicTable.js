

const TopicTable = (props)=>{
    return (

        <table>
            <tbody>
                {props.topics.map(topics => {
                    return (
                        <tr key={topics._id} >
                            
                            <td onClick={() => props.deleteTopic(topics._id)}>DELETE</td>
                            <td onClick={() => props.showEditForm(topics)}>EDIT</td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TopicTable
