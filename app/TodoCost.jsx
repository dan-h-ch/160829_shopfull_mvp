class TodoCost extends React.Component{

  constructor(props) {
    super(props)
  }

  handleClick(e) {
    var returnList = {
      id: this.props.listid,
      userid: this.props.userid
    }
    console.log(returnList)
    // var returnList = this.props.listid
    // returnItem.item_last_edit_userid = this.props.userid
    this.props.deleteList(returnList)
  }

  render() {
    var totCost = this.props.todoList.reduce((memo, val) => {
      return memo + (val.quantity*val.cost)}, 0)

    return (
      <div>
        <div className="final-cost">Total Cost For This Project: ${totCost.toFixed(2)}</div>
        <div onClick={(e) => this.handleClick(e)}>delete lsit </div>
      </div>
    )
  }


}


