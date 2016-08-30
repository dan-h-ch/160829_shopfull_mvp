class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      masterList: []
    }

    this.updateList = (newItem) => {
      var newMasterList = this.state.masterList.concat([newItem])
      this.setState({
        masterList: newMasterList
      })
    }

    this.deleteItem = (item) => {
      var that = this
      $.ajax({
        type: "DELETE",
        url: "/items",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function(data) {
          console.log(data)
          that.setState({
            masterList: data
          })
        },
        error: function(err) {
          console.log("err: ", err)
        }
      })
    }

  }


  render() {
    return (
      <div>
        <div>Nav bar here</div>
        <TodoForm todoList={this.state.masterList} updateList={this.updateList}/>
        <TodoList todoList={this.state.masterList} deleteItem={this.deleteItem}/>
      </div>
    )
  }

  componentDidMount() {
    fetchData({}, function(data) {
      this.setState({
        masterList: data
      })
    }.bind(this))
  }
}

var fetchData = (options, callback) => {
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
    error: function(err) {
      console.log("err: ", err)
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