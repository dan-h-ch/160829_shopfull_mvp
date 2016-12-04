class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // listid: 1
      // submitQuant: 1,
      // submitCost: 1.99,
    };
  }

  handleSubmit(e) {
    if (this.state.submitName === '' || this.state.submitName === undefined) {
      e.preventDefault();
      console.log('did not submit');
    } else {
      e.preventDefault();
      var time = new Date();
      var preparedSubmit = {
        itemname: this.state.submitName,
        quantity: this.state.submitQuant,
        listid: this.props.listid,
        item_create_userid: this.props.userid,
        cost: this.state.submitCost,
        created_at: new Date(),
        updated_at: new Date()
      };
      this.props.addItem(preparedSubmit);
      this.setState({
        // would be cool to have randomizer for the default values
        submitName: '',
        submitQuant: 0,
        submitCost: 0
      });
    }
  }

  updateName(e) {
    this.setState({
      submitName: e.target.value
    });
  }

  updateQuant(e) {
    this.setState({
      submitQuant: parseInt(e.target.value)
    });
  }

  updateCost(e) {
    this.setState({
      submitCost: parseFloat(e.target.value)
    });
  }



  render() {
    return (
      <div>
        <form className="add-todo" onSubmit={this.handleSubmit.bind(this)}>
          <input className="add-todo-form-input" type="text" placeholder="whattobuywhattobuy..." value={this.state.submitName || ''} onChange={(e) => this.updateName(e)} />
          <input className="add-todo-form-button" type="submit" value="Add" />
        </form>
      </div>
    );
  }


}

// removed from above when decision to get rid of cost and quant was made - code exists incase revert
          // <input type="number" min="1" placeholder="howmany..." value={this.state.submitQuant || ''} onChange={(e) => this.updateQuant(e)} />
          // <input type="number" min="0.01" step="0.01" placeholder="cost.." value={this.state.submitCost || ''} onChange={(e) => this.updateCost(e)} />