class ShareList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    var time = new Date();
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
    this.hideShareList();
  }

  hideShareList() {
    this.props.hideShareList();
  }

  updateListName(e) {
    this.setState({
      submitListName: e.target.value
    });
  }

  render() {
    var style = {
      display: this.props.shareDisplayed
    };
    return (
      <div className='submit-new-list' style={style}>
        <div>Share List</div>
        <div>props {this.props.shareDisplayed}</div>
        <div>
          <form className="submitForm" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="newlist..." value={this.state.submitListName || ''} onChange={(e) => this.updateListName(e)} />
            <input type="submit" value="New List!" />
          </form>
        </div>
        <div onClick={(e) => this.hideShareList()}>
          close
        </div>
      </div>
    );
  }
}