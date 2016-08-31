class TodoCost extends React.Component{

  constructor(props) {
    super(props)
  }

  render() {
    var totCost = this.props.todoList.reduce((memo, val) => {
      return memo + (val.quantity*val.cost)}, 0)

    return (
      <div className="final-cost">Total Cost For This Project: ${totCost.toFixed(2)}</div>
    )
  }


}


