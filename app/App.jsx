// import 'whatwg-fetch';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      masterList: [],
      navList: [],
      displayList: [],
      listid: 1, //default - need to change it based on when user logs in
      userid: 1 //temporarily
    }


/////////////////////////////////
/////   LIST RELATED     ///////
///////////////////////////////
    
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

    this.updateListid = (id) => {
      this.setState({
        listid: id
      }, function() {this.makeDisplayData()})
    }

    this.addList = (newList) => {
      fetch('/lists', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList)
      })
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          navList: data
        })
      })
    }

    this.deleteList = (listid) => {

    }

/////////////////////////////////
/////   ITEM RELATED     ///////
///////////////////////////////

    this.updateQuant = (item, addOrSub) => {
      if (addOrSub === "add") {
        item.quantity++
      } else if (addOrSub === "sub") {
        item.quantity = Math.max(item.quantity - 1, 0)
      }
      fetch('/items', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      })
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          masterList: data
        })
      })
    }

    this.addItem = (newItem) => {
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
        }, function() {this.makeDisplayData()})
      })
    }

    this.deleteItem = (item) => {
      fetch('/items', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          masterList: data
        }, function() {this.makeDisplayData()})
      })
    }

    this.fetchData = () => {
      fetch('/items')
      .then(function(res) {
        return res.json()
      })
      // set state with it
      .then((data) => {
        this.setState({
          masterList: data
        }, function() {this.makeDisplayData()})
      })
    }

    this.makeDisplayData = (listid = this.state.listid, deletedStatus = false) => {
      var displayList = this.state.masterList.filter((entry) => entry.listid === listid && entry.deleted === deletedStatus)
      this.setState({
        displayList: displayList
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


  }

  render() {
    return (
      <div>
        <NavBar userid={this.state.userid} navList={this.state.navList} addList={this.addList} updateListid={this.updateListid}/>
        <TodoForm addItem={this.addItem} listid={this.state.listid} userid={this.state.userid}/>
        <TodoList todoList={this.state.displayList} deleteItem={this.deleteItem} updateQuant={this.updateQuant} userid={this.state.userid} />
        <TodoCost todoList={this.state.displayList}/>
      </div>
    )
  }

  componentWillMount() {
    this.fetchData();

    this.fetchAllList();
  }

}


