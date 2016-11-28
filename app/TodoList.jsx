class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="centered-table">
        <div className="header-name">
          {this.props.listname}
        </div>
        <ul>
          {this.props.todoList.map((item) => <TodoListItem key={item.id} todoListItem={item} deleteItem={this.props.deleteItem} updateQuant={this.props.updateQuant} userid={this.props.userid}/>)}
        </ul>
      </div>
    );
  }
}