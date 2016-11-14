class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick(e) {
    this.props.addList(this.props.newListName);
  }

  handleSubmit(e) {
    e.preventDefault();
    var time = new Date();
    console.log(time);
    var preparedSubmit = {
      listname: this.state.submitListName,
      // linting error since we are passing directly to db
      create_userid: this.props.userid,
      created_at: new Date(),
      updated_at: new Date()
    };
    // console.log(preparedSubmit)
    this.props.addList(preparedSubmit);
    this.setState({
      submitListName: '',
      submitQuant: 1,
      submitCost: 1
    });
  }

  updateListName(e) {
    this.setState({
      submitListName: e.target.value
    });
  }

  render() {
    return (
      <div className="nav-container">
        <ul className="nav-bar">
          {this.props.navList.map((list) => <NavBarItem key={list.id} navList={list} listid={this.props.listid} updateListid={this.props.updateListid}/>)}
          <li className="nav-item" onClick={(e) => console.log('popup new list field')}>
            <div>+</div>
          </li>
          <li>
            <form className="submitForm" onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" placeholder="newlist..." value={this.state.submitListName || ''} onChange={(e) => this.updateListName(e)} />
              <input type="submit" value="New List!" />
            </form>
          </li>
        </ul>
      </div>
    );
  }


}