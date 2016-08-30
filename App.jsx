class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      masterList: [{name: "chocolate", quantity: 2, cost: 3.99}]
    }

    this.updateList = (newItem) => {
      var newMasterList = this.state.masterList.concat([newItem])
      this.setState({
        masterList: newMasterList
      })
    }

    this.deleteItem = (item) => {
      cnsole.log(item)
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

  componentDidMount() {
    console.log('loading up')
    fetchData({}, function(data) {
      this.setState({
        masterList: data
      })
    }.bind(this))
  }
}

var fetchData = (options, callback) => {
  console.log("sendingrequest")
  $.ajax({
    type: "GET",
    url: "/items",
    contentType: "application/json",
    success: function(data) {
      callback(data)
      // console.log(this)
      // this.setState({
      //   masterList: data
      // })
    },
    error: function(error) {
      console.log("err: ", error)
    }
  })
}

var sendData = (options, callback) => {
  console.log("postingdata")
  $.ajax({
    type: "POST",
    url: "/items",
    contentType: "application/json",

  })
}