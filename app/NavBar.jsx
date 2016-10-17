class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="nav-container">
        <ul className="nav-bar">
          {this.props.navList.map((list) => <NavBarItem navList={list} />)}
          <li>
            Add new list
          </li>
        </ul>
      </div>
    )
  }


}