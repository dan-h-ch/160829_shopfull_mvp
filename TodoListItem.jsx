class TodoListItem extends React.Component{

  constructor(props) {
    super(props)
  }

  handleClick(e) {
    this.props.deleteItem(this.props.todoListItem)
  }

  increaseQuant(e) {
    this.props.updateQuant(this.props.todoListItem, "add")
  }

  decreaseQuant(e) {
    this.props.updateQuant(this.props.todoListItem, "sub")
  }

  render() {
    var totalCost = Math.round(this.props.todoListItem.quantity * this.props.todoListItem.cost * 100) / 100
    return (
      <tr>
        <td className="item-name">{this.props.todoListItem.itemname}</td>
        <td>{this.props.todoListItem.quantity}</td>
        <td onClick={(e) => this.increaseQuant(e)}>+</td>
        <td onClick={(e) => this.decreaseQuant(e)}>-</td>
        <td>${this.props.todoListItem.cost}</td>
        <td>${totalCost}</td>
        <td className="delete" onClick={(e) => this.handleClick(e)}>delete</td>
      </tr>
    )
  }

}