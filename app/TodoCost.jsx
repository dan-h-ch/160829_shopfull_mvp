class TodoCost extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick(e) {
    var returnList = {
      id: this.props.listid,
      userid: this.props.userid
    };
    // console.log(returnList);
    // var returnList = this.props.listid
    // returnItem.item_last_edit_userid = this.props.userid
    this.props.deleteList(returnList);
  }

  render() {
    var totCost = this.props.todoList.reduce((memo, val) => {
      return memo + (val.quantity * val.cost);
    }, 0);
    var quantItems = this.props.todoList.length;

    return (
      <div>
        <div className="final-quant">{quantItems} Items</div>

        <div className="delete-list-button" onClick={(e) => this.handleClick(e)}>Delete List </div>
      </div>
    );
  }


}
// removed from above when decision to get rid of cost and quant was made - code exists incase revert
        // <div className="final-cost">Total Cost For This Project: ${totCost.toFixed(2)}</div>
