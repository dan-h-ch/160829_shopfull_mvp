class TodoList extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="centered-table">
        <table className="table-list">
          <thead>
            <tr>
              <th className="header-name">Item</th>
              <th>Qty</th>
              <th>  +  </th>
              <th>  -  </th>
              <th>Cost/Unit</th>
              <th>Total Cost</th>
              <th>Del</th>
            </tr>
          </thead>
            <tbody>
              {this.props.todoList.map((item) => <TodoListItem key={item.id} todoListItem={item} deleteItem={this.props.deleteItem} updateQuant={this.props.updateQuant} userid={this.props.userid}/>)}
            </tbody>
        </table>
      </div>
    )
  }
}
