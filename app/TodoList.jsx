class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="list-container">
        <div className="centered-list">
          <div className="header-name">
            {this.props.listname}
          </div>
          <TodoForm addItem={this.props.addItem} userid={this.props.userid} listid={this.props.listid} />
          <ul>
            {this.props.todoList.map((item) => <TodoListItem key={item.id} todoListItem={item} deleteItem={this.props.deleteItem} updateQuant={this.props.updateQuant} userid={this.props.userid}/>)}
          </ul>
        </div>
      </div>
    );
  }
}