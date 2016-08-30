class NavBarItem extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <li className="nav-item">{this.props.navList.listname}</li>
    )
  }

}