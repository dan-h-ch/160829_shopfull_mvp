class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="centered-table">
        <table className="table-list">
          <thead>
            <tr>
              <th className="header-name">Item</th>

              <th>Del</th>
            </tr>
          </thead>
            <tbody>
              {this.props.todoList.map((item) => <TodoListItem key={item.id} todoListItem={item} deleteItem={this.props.deleteItem} updateQuant={this.props.updateQuant} userid={this.props.userid}/>)}
            </tbody>
        </table>
      </div>
    );
  }
}

// removed from above when decision to get rid of cost and quant was made - code exists incase revert
              // <th>Qty</th>
              // <th>+</th>
              // <th>-</th>
              // <th>Cost/Unit</th>
              // <th>Total Cost</th>