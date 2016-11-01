class NavBarItem extends React.Component {
  constructor(props) {
    super(props);
  }

  navFilter(e) {
    // console.log(this.props.navList.id);
    // need to set list id up chain
    this.props.updateListid(this.props.navList.id);
  }



  render() {
    if (this.props.listid === this.props.navList.id) {
      var id = 'selectedList';
    } else {
      var id = 'notSelectedLIst';
    }
    return (
      <li id={id} className="nav-item" onClick={(e) => this.navFilter(e)}>{this.props.navList.listname}</li>
    );
  }

}