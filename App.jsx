class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      masterList: []
    }

    // lots of smells with these ajax calls
    this.addItem = (newItem) => {
      var that = this
      $.ajax({
        type: "POST",
        url: "/items",
        contentType: "application/json",
        data: JSON.stringify(newItem),
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

    this.fetchData = (options, callback) => {
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

  }

  render() {
    return (
      <div>
        <div>Nav bar here</div>
        <TodoForm todoList={this.state.masterList} addItem={this.addItem}/>
        <TodoList todoList={this.state.masterList} deleteItem={this.deleteItem}/>
      </div>
    )
  }

  componentDidMount() {
    this.fetchData({}, function(data) {
      this.setState({
        masterList: data
      })
    }.bind(this))
  }
}


