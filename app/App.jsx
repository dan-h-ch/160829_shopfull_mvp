// import 'whatwg-fetch';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      masterList: [],
      navList: [],
      listid: 1,
      displayList: [] //default - need to change it based on when user logs in
    }

    this.updateListid = (id) => {
      var displayList = this.state.masterList.filter((entry) => entry.listid === id)
      this.setState({
        listid: id,
        displayList: displayList
      })
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
          that.setState({
            masterList: data
          })
        },
        error: function(err) {
          console.log("err: ", err)
        }
      })
    }

    this.addList = (newList) => {
      var that = this
      $.ajax({
        type: "POST",
        url: "/lists",
        contentType: "application/json",
        data: JSON.stringify(newList),
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

    this.addItem = (newItem) => {
      var that = this
      fetch('/items', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      })
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          masterList: data
        }, function() {
          // this is callback to setState - ideally should implement it as a promise
          var displayList = this.state.masterList.filter((entry) => entry.listid === this.state.listid)
          this.setState({
            displayList: displayList
          })
        })
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

    this.fetchData = () => {
      fetch('/items')
      .then(function(res) {
        return res.json()
      })
      // set state with it
      .then((data) => {
        console.log(data)
        this.setState({
          masterList: data
        }, function() {
          // this is callback to setState - ideally should implement it as a promise
          var displayList = this.state.masterList.filter((entry) => entry.listid === this.state.listid)
          this.setState({
            displayList: displayList
          })
        })
      })
    }

    // // not being used
    // this.filterData = (filterObj) => {
    //   $.ajax({
    //     type: "POST",
    //     url: "/filter",
    //     contentType: "application/json",
    //     data: JSON.stringify(filterObj),
    //     success: function(data) {
    //       callback(data)
    //       // console.log(this)
    //       // this.setState({
    //       //   masterList: data
    //       // })
    //     },
    //     error: function(err) {
    //       console.log("err: ", err)
    //     }
    //   })
    // }

    this.fetchAllList = () => {
      var that = this;
      fetch('/lists')
      .then(function(res) {
        return res.json()
      })
      .then(function(data) {
        that.setState({
          navList: data
        })
      })
    }
  }

  render() {
    return (
      <div>
        <NavBar navList={this.state.navList} addList={this.addList} updateListid={this.updateListid}/>
        <TodoForm addItem={this.addItem} listid={this.state.listid}/>
        <TodoList todoList={this.state.displayList} deleteItem={this.deleteItem} updateQuant={this.updateQuant}  />
        <TodoCost todoList={this.state.displayList}/>
      </div>
    )
  }

  componentWillMount() {
    this.fetchData();

    this.fetchAllList();
  }

}


