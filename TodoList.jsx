class TodoList extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    console.log(this.props.todoList)
    return (
      <table>
        <tr>
          <th>Shopping Item</th>
          <th>Qty</th>
          <th>Cost/Unit</th>
          <th>Total Cost</th>
        </tr>
        {this.props.todoList.map((item) => <TodoListItem todoListItem={item} />)}
      </table>
    )
  }
}
