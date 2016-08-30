class TodoList extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Shopping Item</th>
            <th>Qty</th>
            <th>Cost/Unit</th>
            <th>Total Cost</th>
            <th>+</th>
            <th>-</th>
          </tr>
        </thead>
          <tbody>
        {this.props.todoList.map((item) => <TodoListItem todoListItem={item} deleteItem={this.props.deleteItem}/>)}
          </tbody>
      </table>
    )
  }
}
