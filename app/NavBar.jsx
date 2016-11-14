class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick(e) {
    this.props.addList(this.props.newListName);
  }

  displayNewList() {
    this.props.displayNewList();
  }

  render() {
    return (
      <div className="nav-container">
        <ul className="nav-bar">
          {this.props.navList.map((list) => <NavBarItem key={list.id} navList={list} listid={this.props.listid} updateListid={this.props.updateListid}/>)}
          <li className="nav-item" onClick={(e) => this.displayNewList()}>
            <div>+</div>
          </li>
        </ul>
      </div>
    );
  }


}