

const TopicTable = (props)=>{
  console.log(props.topics)
    return (

        <table>
            <tbody>
                {props.topics.map(topic => {
                    return (
                        <tr key={topic._id.na} >
                        <td>{topic.name}</td>
                        <td onClick={() => props.deleteTopic(topic._id)}> DELETE GAME </td>
                        <td onClick={() => props.showEditForm(topic)}> EDIT GAME </td>
                        </tr>
                        )
                    })
                }
            </tbody>

        </table>



    )

}

export default TopicTable
