class TodoForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      submitName: "newItem",
      submitQuant: 1,
      submitCost: 0.99
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    var preparedSubmit = {
      name: this.state.submitName,
      quantity: this.state.submitQuant,
      cost: this.state.submitCost
    }
    this.props.updateList(preparedSubmit)
    this.setState({
      submitName: "newItem",
      submitQuant: 1,
      submitCost: 0.99
    })
  }

  updateName(e) {
    this.setState({
      submitName: e.target.value
    })
  }

  updateQuant(e) {
    this.setState({
      submitQuant: parseInt(e.target.value)
    })
  }

  updateCost(e) {
    this.setState({
      submitCost: parseFloat(e.target.value)
    })
  }



  render() {
    return (
      <div className="addtodo">
        <form className="submitForm" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="whattobuywhattobuy..." value={this.state.submitName} onChange={(e) => this.updateName(e)} />
          <input type="number" placeholder="howmany..." value={this.state.submitQuant} onChange={(e) => this.updateQuant(e)} />
          <input type="number" min="0.01" step="0.01" placeholder="cost.." value={this.state.submitCost} onChange={(e) => this.updateCost(e)} />
          <input type="submit" value="Must Buy!" />
        </form>
      </div>
    )
  }



}