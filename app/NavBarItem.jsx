class NavBarItem extends React.Component {
  constructor(props) {
    super(props)
  }

  navFilter(e) {
    console.log(this.props.navList.id)
    // need to set list id up chain
    this.props.updateListid(this.props.navList.id)
  }



  render() {
    return (
      <li className="nav-item" onClick={(e) => this.navFilter(e)}>{this.props.navList.listname}</li>
    )
  }

}