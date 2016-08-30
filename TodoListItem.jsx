class TodoListItem extends React.Component{

  constructor(props) {
    super(props)
  }



  render() {
    return (
      <tr>
        <td>{this.props.todoListItem.itemname}</td>
        <td>{this.props.todoListItem.quantity}</td>
        <td>{this.props.todoListItem.cost}</td>
        <td>{this.props.todoListItem.quantity * this.props.todoListItem.cost}</td>
      </tr>
    )
  }

}