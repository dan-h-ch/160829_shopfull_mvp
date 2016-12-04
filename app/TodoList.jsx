class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var quantItems = this.props.todoList.length;

    return (
      <div className="list-container">
        <div className="centered-list">
          <div className="list-header-container">
            <div className="list-header-name">
              {this.props.listname}
            </div>
            <div className="list-header-quant">
              ({quantItems} items)
            </div>
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