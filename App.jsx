class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      masterList: [{name: "chocolate", quantity: 2, cost: 3.99}]
    }
  }


  render() {
    return (
      <div>
        <div>Nav bar here</div>
        <div>Entry form here</div>
        <TodoList todoList={this.state.masterList}/>
      </div>
    )
  }
}