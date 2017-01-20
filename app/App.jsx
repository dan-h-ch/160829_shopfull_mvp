class App extends React.Component {

  componentWillMount() {
    this.lock = new Auth0LockPasswordless('eaDzLmALxb7fvxQhVKTkxW8rEDtMnGZD', 'danch.auth0.com');
  }

  componentDidMount() {
    this.setState({
      idToken: this.getIdToken()
    }, () => {
      this.lock.getProfile(this.state.idToken, (err, prof) => {
        if (prof) {
          this.setState({
            userid: prof.user_id,
            profile: prof,
            email_phone: prof.email
          }, () => {
            this.fetchLists();
            this.fetchItems();
          });
        }
      });
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      masterList: [],
      navList: [],
      displayList: [],
      listid: 1, //default - need to change it based on when user logs in
      userid: '', //temporarily
      createDisplayed: 'none',
      shareDisplayed: 'none',
      login: 'default',
      email_phone: ''
    };

/////////////////////////////////
/////   LIST RELATED     ///////
///////////////////////////////
    
    // controls if display for adding a new list is visible
    this.displayNewList = () => {
      this.setState({
        createDisplayed: 'block'
      });
    };

    this.hideNewList = () => {
      this.setState({
        createDisplayed: 'none'
      });
    };

    this.displayShareList = () => {
      this.setState({
        shareDisplayed: 'block'
      });
    };

    this.hideShareList = () => {
      this.setState({
        shareDisplayed: 'none'
      });
    };

    this.fetchLists = () => {
      // userid is being passed on in URL, ultimately refactor our when auth token is in place
      console.log('fetchLists');
      var getUrl = `/lists/${this.state.userid}`;
      fetch(getUrl)
      .then((res) => res.json())
      .then((data) => {
        var displayList = data.reduce((memo, val) => {
          return val.listid < memo.listid ? val : memo;
        });
        this.setState({
          navList: data,
          listid: displayList.listid,
          listname: displayList.listname
        });
      });
    };

    // visually what do you see, does not change masterList or navList
    this.updateListid = (id, listname) => {
      this.setState({
        listid: id,
        listname: listname
      }, function() { this.makeDisplayData(); });
    };

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
        console.log(data);
        var activeList = data.reduce((memo, val) => {
          return Math.max(val.listid, memo);
        }, -Infinity);
        this.setState({
          navList: data,
          listid: activeList
        }, function() { this.makeDisplayData(); });
      });
    };

    this.deleteList = (list) => {
      fetch('/lists', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
      })
      .then((data) => data.json())
      .then((data) => {
        var activeList = data.reduce((memo, val) => {
          return Math.max(val.id, memo);
        }, -Infinity);
        this.setState({
          navList: data,
          listid: activeList
        }, function() { this.makeDisplayData(); });
      });
    };

    this.shareList = (shareDataObj) => {
      fetch('/userlists', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shareDataObj)
      })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      });
    };

/////////////////////////////////
/////   ITEM CHANGES     ///////
///////////////////////////////

    this.updateQuant = (item, addOrSub) => {
      if (addOrSub === 'add') {
        item.quantity++;
      } else if (addOrSub === 'sub') {
        item.quantity = Math.max(item.quantity - 1, 0);
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
        });
      });
    };

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
        }, function() { this.makeDisplayData(); });
      });
    };

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
        }, function() { this.makeDisplayData(); });
      });
    };

/////////////////////////////////
/////   USER RELATED     ///////
///////////////////////////////

    // this.fetchUsername = () => {
    //   // userid is being passed on in URL, ultimately refactor our when auth token is in place
    //   var getUrl = `/username/${this.state.userid}`;
    //   fetch(getUrl)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.setState({
    //       username: data.username
    //     });
    //   });
    // };

    // this.saveUsername = (userData) => {
    //   fetch('/users', {
    //     method: 'PUT',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userData)
    //   })
    //   .then((body) => body.json())
    //   .then((res) => {
    //     this.setState({
    //       username: res.username,
    //       error: res.error
    //     });
    //   })
    //   .catch((err) => console.log('err0r', err));
    // };

    this.logOut = () => {
      localStorage.removeItem('id_token');
      this.setState({
        idToken: '',
        userid: '',
        masterList: [],
        navList: [],
        displayList: [],
        email_phone: ''
      });
    };

  }

  // deleteItem(item) {
  //   fetch('/items', {
  //     method: 'DELETE',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(item)
  //   })
  //   .then((data) => data.json())
  //   .then((data) => {
  //     this.setState({
  //       masterList: data
  //     }, function() {this.makeDisplayData()})
  //   })
  // }

  addUser(userData) {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then((body) => body.json())
    .then((res) => {
      this.setState({
        email_phone: res.email_phone
      });
    })
    .catch((err) => console.log('err0r', err));
  }

  fetchItems() {
    var getUrl = `/items/${this.state.userid}`;
    fetch(getUrl)
    .then(function(res) {
      return res.json();
    })
    // set state with it
    .then((data) => {
      this.setState({
        masterList: data
      }, function() { this.makeDisplayData(); });
    });
  }

  // got all items and filter for deleted items
  makeDisplayData(listid = this.state.listid, deletedStatus = false) {
    var displayList = this.state.masterList.filter((entry) => entry.listid === listid && entry.deleted === deletedStatus);
    this.setState({
      displayList: displayList
    });
  }

  showLock() {
    if (this.state.login === 'phone') {
      // sms
      this.lock.sms((err, profile, idToken, state) => {
        if (!err) {
          // set JWT on localstorage
          localStorage.setItem('id_token', idToken);
          this.setState({
            userid: profile.user_id,
            profile: profile,
            // relies on local storage, triggers render()
            idToken: this.getIdToken()
          }, () => {
            this.fetchLists();
            this.fetchItems();
          });
          // add user to db
          var userData = {};
          userData.id = profile.user_id;
          userData.email_phone = profile.email;
          this.addUser(userData);
        }
      });
    } else {
      // Open the lock in Email Code mode with the ability to handle the authentication in page
      this.lock.emailcode((err, profile, idToken, state) => {
        if (!err) {
          // set JWT on localstorage
          localStorage.setItem('id_token', idToken);
          this.setState({
            userid: profile.user_id,
            // // profile is return from auth0 - has some data available
            // profile: profile,
            email_phone: profile.email,
            // relies on local storage, triggers render()
            idToken: this.getIdToken()
          }, function() {
            this.fetchLists();
            this.fetchItems();
          });
          // this.setState({
          //   email_phone: profile.email
          // });
          // add user to db
          var userData = {};
          userData.id = profile.user_id;
          userData.email_phone = profile.email;
          this.addUser(userData);
        }
      });
    }

  }

  getIdToken() {
    // First, check if there is already a JWT in local storage
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log('Error signing in', authHash);
      }
    }
    return idToken;
  }


  render() {
    // if idtoken
    if (this.state.idToken &&
      // ideally you can bring in a library for this if you need to do it a lot
      // expire date on token exists
      JSON.parse(window.atob(this.state.idToken.split('.')[1])).exp !== undefined &&
      // expire date on token is more than current time
      JSON.parse(window.atob(this.state.idToken.split('.')[1])).exp > Date.now() / 1000) {
      return (
        <div>
          <Header email_phone={this.state.email_phone} logOut={this.logOut}/>
          <NewList userid={this.state.userid} addList={this.addList} createDisplayed={this.state.createDisplayed} hideNewList={this.hideNewList}/>
          <NavBar userid={this.state.userid} navList={this.state.navList} updateListid={this.updateListid} listid={this.state.listid} displayNewList={this.displayNewList}/>
          <TodoList todoList={this.state.displayList} listname={this.state.listname} deleteItem={this.deleteItem} updateQuant={this.updateQuant} userid={this.state.userid} listid={this.state.listid} addItem={this.addItem}/>
          <Bottom todoList={this.state.displayList} deleteList={this.deleteList} listid={this.state.listid} userid={this.state.userid} displayShareList={this.displayShareList}/>
          <ShareList userid={this.state.userid} shareList={this.shareList} shareDisplayed={this.state.shareDisplayed} hideShareList={this.hideShareList} listid={this.state.listid} listname={this.state.listname}/>
        </div>
      );
    } else {
      return (
        <div className='login-box'>
          <div className='login-box-header'>Login to Listify</div>
          <div>
            <div id={this.state.login === 'default' || this.state.login === 'phone' ? 'selectedLogin' : 'notSelectedLogin'} className='login-select' onClick={(e) => this.setState({login: 'phone'})}>
              Phone Number
            </div>
            <div id={this.state.login === 'email' ? 'selectedLogin' : 'notSelectedLogin'} className='login-select' onClick={(e) => this.setState({login: 'email'})}>
              Email Address
            </div>
          </div>
          <div className='login-click' onClick={(e) => this.showLock()}>
            Login
          </div>
        </div>
      );
    }
  }


}


