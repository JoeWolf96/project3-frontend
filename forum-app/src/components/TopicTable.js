import Skeleton from "react-loading-skeleton";

const TopicTable = (props)=>{
  console.log(props.topics)
    return (

        <table>
            <tbody>
                {props.topics.map(topics => {
                    return (
                        <tr key={topics._id} >
                        <td>{topics.name}</td>
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
