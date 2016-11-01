class Home extends React.Component {

  componentWillMount() {

    this.lock = new Auth0Lock('eaDzLmALxb7fvxQhVKTkxW8rEDtMnGZD', 'danch.auth0.com');

  }

  showLock() {
    this.lock.show();
  }

  render() {
    return (
      <div>
        <a onClick={(e) => this.showLock()}>Sign In</a>
      </div>
    );

  }


}