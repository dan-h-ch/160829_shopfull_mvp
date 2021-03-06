class Username extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    var userData = {
      id: this.props.userid,
      username: this.state.submitUsername
    };
    this.props.saveUsername(userData);
  }

  updateUsername(e) {
    this.setState({
      submitUsername: e.target.value
    });
    this.state.submitUsername;
  }

  render() {
    return (
      <div>
        <div>
          Please select a username (username will be used when sharing list and connecting with other users)
        </div>
        <form className="username" onSubmit={this.handleSubmit.bind(this)}>
          <input className="username-form-input" type="text" placeholder="Username" value={this.state.submitUsername || ''} onChange={(e) => this.updateUsername(e)} />
          <input className="username-form-button" type="submit" value="Submit" />
        </form>
        <div>
          {this.props.error}
        </div>
      </div>
    );
  }

}