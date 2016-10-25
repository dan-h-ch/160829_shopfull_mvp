// import 'whatwg-fetch';

class App extends React.Component {

  componentWillMount() {
    this.lock = new Auth0Lock('eaDzLmALxb7fvxQhVKTkxW8rEDtMnGZD', 'danch.auth0.com')
  }

  componentDidMount() {
    this.fetchLists();
    this.fetchItems();
    this.setState({
      idToken: this.getIdToken()
    }, () => {
      // set more state stuff
      this.lock.getProfile(this.state.idToken, (err, prof)  => {
        this.setState({
          userid: prof.user_id,
          profile: prof
        })
        console.log(this.state.userid)
        console.log(this.state.profile)
        var userData = {}
        userData.id = prof.user_id
        userData.email = prof.email
        this.addUser(userData)
      })
    });
  }

  constructor(props) {
    super(props)

    this.state = {
      masterList: [],
      navList: [],
      displayList: [],
      listid: 1, //default - need to change it based on when user logs in
      userid: '' //temporarily
    }


/////////////////////////////////
/////   LIST RELATED     ///////
///////////////////////////////
    
    this.fetchLists = () => {
      // userid is being passed on in URL, ultimately refactor our when auth token is in place
      var getUrl = `/lists/${this.state.userid}`
      fetch(getUrl)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          navList: data
        })
      })
    }

    // visually what do you see, does not change masterList or navList
    this.updateListid = (id) => {
      this.setState({
        listid: id
      }, function() {this.makeDisplayData()})
    }

    // posts a new list and gets all lists allows - follow route to see
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
/////   ITEM CHANGES     ///////
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

  addUser(userData) {
    fetch(`/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then((body) => body.json())
    .then((res) => console.log(res))
    .catch((err) => console.log("err0r", err))
  }

  fetchItems() {
    var getUrl = `/items/${this.state.userid}`
    fetch(getUrl)
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

  makeDisplayData(listid = this.state.listid, deletedStatus = false) {
    var displayList = this.state.masterList.filter((entry) => entry.listid === listid && entry.deleted === deletedStatus)
    this.setState({
      displayList: displayList
    })
  }

  showLock() {
    this.lock.show()
  }

  getIdToken() {
    // First, check if there is already a JWT in local storage
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  }

  render() {
    if (this.state.idToken) {
      // this.lock.getProfile(this.state.idToken, (err, prof)  => {
      //   // // keeps rendering because i keep setting it
      //   // this.setState({
      //   //   userid: prof.user_id,
      //   //   profile: prof
      //   // })
      //   console.log(this.state.userid)
      //   var userData = {}
      //   userData.id = prof.user_id
      //   userData.email = prof.email
      //   // this.addUser(userData)
      //   // if user id exists already mostly in place
      //   // if userid doesn't exist create entry
      // })
      return (
        <div>
          <NavBar userid={this.state.userid} navList={this.state.navList} addList={this.addList} updateListid={this.updateListid}/>
          <TodoForm addItem={this.addItem} listid={this.state.listid} userid={this.state.userid}/>
          <TodoList lock={this.lock} todoList={this.state.displayList} deleteItem={this.deleteItem} updateQuant={this.updateQuant} userid={this.state.userid} />
          <TodoCost todoList={this.state.displayList}/>
        </div>
      )
    } else {
      return (
        <div>
          <a onClick={(e) => this.showLock()}>Sign In</a>
        </div>
      )
    }
  }



}


