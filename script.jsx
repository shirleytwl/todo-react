class List extends React.Component {
	constructor() {
		super();

		this.state = {
			word: "",
			list: [],
			validated: false,
			typed: false
		}
	}

	addItem() {
		if (this.state.validated) {
			let list = this.state.list;
			list.push({
				word: this.state.word,
				date: moment().format('DD MMM YYYY, h:mm a')
			});
			this.setState({list: list});
			this.setState({word: ""});
			this.setState({typed: false})
		}
	}

	removeItem(index) {
		let list = this.state.list;
		list.splice(index, 1);
		this.setState({list: list});
	}

	changeHandler(e) {
		let value = e.target.value;
		this.setState({word: value});
		if (value.length <= 0 || value.length > 20) {
			this.setState({validated: false})
		} else {
			this.setState({validated: true})
		}
		this.setState({typed: true})
	}

	checkKey(e) {
		if(e.keyCode == 13){
			this.addItem();
		}
	}

	render() {
		// render the list with a map() here

		let listItems = this.state.list.map((item, index) => {
			return (
				<li className="list-group-item" key={index}>
					<p>{index + 1}. {item.word}</p>
					<p>Posted on {item.date}</p>
					<div className="btn btn-danger" onClick={() => {
						this.removeItem(index)
					}}>Delete
					</div>
				</li>);
		});
		let errorMessage = null;
		if (!this.state.validated && this.state.typed) {
			errorMessage = <div className="alert alert-danger" role="alert">
				must be more than 1 character and less than 20 characters
			</div>
		} else {
			errorMessage = null;
		}
		return (
			<div className="wrapper">
				<h2 className="mb-5">To-Do List</h2>
				<input className="form-control"
			        onChange={(e) => {this.changeHandler(e)}}
			        onKeyDown={(e)=>{this.checkKey(e)}}
					value={this.state.word}/>
				<button className="my-3 btn btn-primary" onClick={() => {
					this.addItem()
				}}>Add item
				</button>
				{errorMessage}
				<div className="list mt-5">
					<ul className="list-group">
						{listItems}
					</ul>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<div className="container my-5">
		<div className="row">
			<div className="col">
				<List/>
			</div>
		</div>
	</div>
	, document.getElementById('root')
);

