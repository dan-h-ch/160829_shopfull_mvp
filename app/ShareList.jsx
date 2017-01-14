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
      email_phone: this.state.share_email_phone
    };
    // console.log(preparedSubmit)
    this.props.shareList(preparedSubmit);
    this.setState({
      share_email_phone: '',
    });
    this.hideShareList();
  }

  hideShareList() {
    this.props.hideShareList();
  }

  updateShareUsername(e) {
    this.setState({
      share_email_phone: e.target.value
    });
  }

  render() {
    var style = {
      display: this.props.shareDisplayed
    };
    return (
      <div className='submit-new-list' style={style}>
        <div className='top-close' onClick={(e) => this.hideShareList()}>
          close
        </div>
        <div>Share This List</div>
        <div>Enter username to share with</div>
        <div>
          <form className="share-list" onSubmit={this.handleSubmit.bind(this)}>
            <input className="share-list-form-input" type="text" placeholder="username" value={this.state.shareUsername || ''} onChange={(e) => this.updateShareUsername(e)} />
            <input className="share-list-form-button" type="submit" value="Share!" />
          </form>
        </div>
      </div>
    );
  }
}