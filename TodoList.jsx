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
              <th className="header-name">Shopping Item</th>
              <th>Qty</th>
              <th>  +  </th>
              <th>  -  </th>
              <th>Cost/Unit</th>
              <th>Total Cost</th>
            </tr>
          </thead>
            <tbody>
              {this.props.todoList.map((item) => <TodoListItem todoListItem={item} deleteItem={this.props.deleteItem}/>)}
            </tbody>
        </table>
      </div>
    )
  }
}
