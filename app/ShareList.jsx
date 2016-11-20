class ShareList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    var preparedSubmit = {
      listid: this.props.listid,
      // linting error since we are passing directly to db
      username: this.state.shareUsername
    };
    // console.log(preparedSubmit)
    this.props.shareList(preparedSubmit);
    this.setState({
      shareUsername: '',
    });
    this.hideShareList();
  }

  hideShareList() {
    this.props.hideShareList();
  }

  updateShareUsername(e) {
    this.setState({
      shareUsername: e.target.value
    });
  }

  render() {
    var style = {
      display: this.props.shareDisplayed
    };
    return (
      <div className='submit-new-list' style={style}>
        <div>Share This List</div>
        <div>props {this.props.shareDisplayed}</div>
        <div>Enter username to share with</div>
        <div>
          <form className="submitForm" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="username" value={this.state.shareUsername || ''} onChange={(e) => this.updateShareUsername(e)} />
            <input type="submit" value="Share!" />
          </form>
        </div>
        <div onClick={(e) => this.hideShareList()}>
          close
        </div>
      </div>
    );
  }
}