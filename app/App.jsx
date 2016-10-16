class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      masterList: [],
      navList: []
    }

    // lots of smells with these ajax calls
    this.updateQuant = (item, addOrSub) => {
      if (addOrSub === "add") {
        item.quantity++
      } else if (addOrSub === "sub") {
        item.quantity = Math.max(item.quantity - 1, 0)
      }
      var that = this
      $.ajax({
        type: "PUT",
        url: "/items",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function(data) {
          console.log(data)
          console.log("hoho")
          that.setState({
            masterList: data
          })
        },
        error: function(err) {
          console.log("err: ", err)
        }
      })
    }

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
      console.log("about to fetch data")
      $.ajax({
        type: "GET",
        url: "/items",
        contentType: "application/json",
        success: function(data) {
          callback(data)
        },
        error: function(err) {
          console.log("err: ", err)
        }
      })
    }

    this.filterData = (filterObj) => {
      $.ajax({
        type: "POST",
        url: "/filter",
        contentType: "application/json",
        data: JSON.stringify(filterObj),
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

    this.fetchAllList = () => {
      var that = this;
      $.ajax({
        type: "GET",
        url: "/lists",
        contentType: "application/json",
        success: function(data) {
          console.log(data)
          that.setState({
            navList: data
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
        <NavBar navList={this.state.navList}/>
        <TodoForm todoList={this.state.masterList} addItem={this.addItem}/>
        <TodoList todoList={this.state.masterList} deleteItem={this.deleteItem} updateQuant={this.updateQuant} />
        <TodoCost todoList={this.state.masterList}/>
      </div>
    )
  }

  componentDidMount() {
    this.fetchData({}, function(data) {
      this.setState({
        masterList: data
      })
    }.bind(this))

    this.fetchAllList()
  }
}


