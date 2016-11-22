class NewList extends React.Component {

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
    this.hideNewList();
  }

  updateListName(e) {
    this.setState({
      submitListName: e.target.value
    });
  }

  hideNewList() {
    this.props.hideNewList();
  }

  render() {
    var style = {
      display: this.props.createDisplayed
    };
    return (
      <div className='submit-new-list' style={style}>
        <div>Add New List</div>
        <div>
          <form className="submitForm" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="List name" value={this.state.submitListName || ''} onChange={(e) => this.updateListName(e)} />
            <input type="submit" value="New List!" />
          </form>
        </div>
        <div onClick={(e) => this.hideNewList()}>
          close
        </div>
      </div>
    );
  }
}