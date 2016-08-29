var React = require("react")

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      masterList: [{name: "chocolate", quantity: 2, cost: 3.99}]
    }

    this.updateList = (newItem) => {
      console.log(newItem)
      var newMasterList = this.state.masterList.concat([newItem])
      this.setState({
        masterList: newMasterList
      })
    }
  }


  render() {
    return (
      <div>
        <div>Nav bar here</div>
        <TodoForm todoList={this.state.masterList} updateList={this.updateList}/>
        <TodoList todoList={this.state.masterList}/>
      </div>
    )
  }
}

module.exports = App