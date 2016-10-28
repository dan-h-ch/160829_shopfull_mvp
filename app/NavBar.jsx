class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleClick(e) {
    this.props.addList(this.props.newListName)
  }

  handleSubmit(e) {
    e.preventDefault()
    var time = new Date()
    console.log(time)
    var preparedSubmit = {
      listname: this.state.submitListName,
      create_userid: this.props.userid,
      created_at: new Date(),
      updated_at: new Date()
    }
    console.log(preparedSubmit)
    this.props.addList(preparedSubmit)
    this.setState({
      // would be cool to have randomizer for the default values
      submitListName: '',
      // submitQuant: 1,
      // submitCost: 9.99
    })
  }

  updateListName(e) {
    this.setState({
      submitListName: e.target.value
    })
  }

  render() {
    return (
      <div className="nav-container">
        <ul className="nav-bar">
          {this.props.navList.map((list) => <NavBarItem key={list.id} navList={list} updateListid={this.props.updateListid}/>)}
          <li>
            <form className="submitForm" onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" placeholder="newlist..." value={this.state.submitListName || ''} onChange={(e) => this.updateListName(e)} />
              <input type="submit" value="New List!" />
            </form>
          </li>
        </ul>
      </div>
    )
  }


}