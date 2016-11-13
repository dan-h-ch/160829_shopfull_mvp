class TodoListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick(e) {
    var returnItem = this.props.todoListItem;
    returnItem.item_last_edit_userid = this.props.userid;
    this.props.deleteItem(returnItem);
  }

  increaseQuant(e) {
    var returnItem = this.props.todoListItem;
    returnItem.item_last_edit_userid = this.props.userid;
    this.props.updateQuant(returnItem, 'add');
  }

  decreaseQuant(e) {
    var returnItem = this.props.todoListItem;
    returnItem.item_last_edit_userid = this.props.userid;
    this.props.updateQuant(returnItem, 'sub');
  }

  render() {
    var totalCost = Math.round(this.props.todoListItem.quantity * this.props.todoListItem.cost * 100) / 100;
    return (
      <tr>
        <td className="item-name">{this.props.todoListItem.itemname}</td>

        <td className="delete" onClick={(e) => this.handleClick(e)}>delete</td>
      </tr>
    );
  }

}

// removed from above when decision to get rid of cost and quant was made - code exists incase revert
        // <td>{this.props.todoListItem.quantity}</td>
        // <td onClick={(e) => this.increaseQuant(e)}>+</td>
        // <td onClick={(e) => this.decreaseQuant(e)}>-</td>
        // <td>${this.props.todoListItem.cost}</td>
        // <td>${totalCost.toFixed(2)}</td>