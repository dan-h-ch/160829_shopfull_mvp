class TodoListItem extends React.Component{

  constructor(props) {
    super(props)
  }

  handleClick(e) {
    this.props.deleteItem(this.props.todoListItem)
  }



  render() {
    var totalCost = Math.round(this.props.todoListItem.quantity * this.props.todoListItem.cost * 100) / 100
    return (
      <tr onClick={(e) => this.handleClick(e)}>
        <td>{this.props.todoListItem.itemname}</td>
        <td>{this.props.todoListItem.quantity}</td>
        <td>{this.props.todoListItem.cost}</td>
        <td>{totalCost}</td>
      </tr>
    )
  }

}