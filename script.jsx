class TodoApp extends React.Component {
	constructor() {
		super();

		this.state = {
			word: "",
			list: [
				{
					todo: "Make Todo List",
					created_at: "21 Aug 2019, 12:29 pm",
					updated_at: "21 Aug 2019, 12:29 pm",
					checked: true,
					editing: false
				},
				{
					todo: "Populate the list",
					created_at: "22 Aug 2019, 4:29 pm",
					created_at: "22 Aug 2019, 4:29 pm",
					checked: true,
					editing: false
				},
				{
					todo: "Add the deleted items list",
					created_at: "23 Aug 2019, 8:29 pm",
					updated_at: "23 Aug 2019, 8:29 pm",
					checked: false,
					editing: false
				},
				{
					todo: "Make it so that items expire after sometime",
					created_at: "24 Aug 2019, 11:29 am",
					updated_at: "24 Aug 2019, 11:29 am",
					checked: false,
					editing: false
				},
				{
					todo: "Make another level of hierarchy",
					created_at: "25 Aug 2019, 5:29 pm",
					updated_at: "25 Aug 2019, 5:29 pm",
					checked: false,
					editing: false
				},

			],
			validated: false,
			typed: false,
			editing: false
		};
		this.addItem = this.addItem.bind(this);
		this.validate = this.validate.bind(this);
		this.checkItem = this.checkItem.bind(this);
		this.editItem = this.editItem.bind(this);
		this.updateItem = this.updateItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}
	addItem(e) {
		e.preventDefault();
		if (this.state.validated) {
			let list = this.state.list;
			list.push({
				todo: this.state.word,
				created_at: moment().format('DD MMM YYYY, h:mm a'),
				checked: false
			});
			this.setState({
				list: list,
				typed: false,
				word: ""
			});
		}
	}
	validate(e) {
		let value = e.target.value;
		let validated = false;
		this.setState({word: value});
		if (value.length <= 0 || value.length > 50) {
			validated = false;
		} else {
			validated = true;
		}
		this.setState({
			typed: true,
			validated: validated
		})
	}
	checkItem(index) {
		let list = this.state.list;
		if(list[index].checked) {
			list[index].checked = false;
		}
		else {
			list[index].checked = true;
		}
		this.setState({list: list});
	}
	editItem(index){
		let list = this.state.list;
		if (!this.state.editing) {
			list[index].editing = true;
			this.setState({
				list: list,
				wordEdit: list[index].todo,
				editing: true
			});
		}
		else {
			if (list[index].editing) {
				list[index].editing = false;
				this.setState({
					list: list,
					wordEdit: "",
					editing: false
				});
			}
		}
	}
	updateItem(e,index,word) {
		e.preventDefault();
		let list = this.state.list;
		list[index].todo = word;
		list[index].updated_at = moment().format('DD MMM YYYY, h:mm a');
		list[index].editing = false;
		this.setState({
			list: list,
			editing: false
		});
	}
	removeItem(index) {
		let list = this.state.list;
		list.splice(index, 1);
		this.setState({list: list});
	}
	render() {
		return (
			<div className="container-fluid my-5">
				<div className="row px-5">
					<div className="col">
						<h2 className="mb-4">Todo List</h2>
						<Form
							word={this.state.word}
							addItem={this.addItem}
							validate={this.validate}
							validated={this.state.validated}
							typed={this.state.typed}>
						</Form>
					</div>
				</div>
				<div className="row px-5">
					<div className="col">
						<ItemList
							list={this.state.list}
							checkItem={this.checkItem}
							editItem={this.editItem}
							updateItem={this.updateItem}
							removeItem={this.removeItem}>
						</ItemList>
					</div>
					<div className="col">
						<DoneList
							list={this.state.list}
							checkItem={this.checkItem}
							editItem={this.editItem}
							updateItem={this.updateItem}
							removeItem={this.removeItem}>
						</DoneList>
					</div>
				</div>
			</div>
		)
	}
}

class Form extends React.Component {
	render() {
		let errorMessage = null;
		if (!this.props.validated && this.props.typed) {
			errorMessage = <div className="alert alert-danger" role="alert">
				must not be empty and must be &lt; 50 characters
			</div>
		} else {
			errorMessage = null;
		}
		return (
			<form>
				<input className="form-control" onChange={this.props.validate} value={this.props.word}/>
				<button type="submit" className="my-3 btn btn-primary" onClick={this.props.addItem}>Add item</button>
				{errorMessage}
			</form>
		)
	}
}
class ItemList extends React.Component {
	render() {
		let listItems = this.props.list.map((item, index) => {
			if (!item.checked) {
				return (
					<TodoItem
						key={index}
						item={item}
						index={index}
						checkItem={this.props.checkItem}
						editItem={this.props.editItem}
						updateItem={this.props.updateItem}
						removeItem={this.props.removeItem}>
					</TodoItem>
				)
			}
		});
		return (
			<div className="checklist-current">
				<h4>Pending</h4>
				<div className="list">
					<ul className="list-group">
						{listItems}
					</ul>
				</div>
			</div>
		)
	}
}
class DoneList extends React.Component {
	render() {
		let listItems = this.props.list.map((item, index) => {
			if (item.checked) {
				return (
					<TodoItem
						key={index}
						item={item}
						index={index}
						checkItem={this.props.checkItem}
						editItem={this.props.editItem}
						updateItem={this.props.updateItem}
						removeItem={this.props.removeItem}>
					</TodoItem>
				)
			}
		});
		return (
			<div className="checklist-current">
				<h4>Done</h4>
				<div className="list">
					<ul className="list-group">
						{listItems}
					</ul>
				</div>
			</div>
		)
	}
}
class TodoItem extends React.Component {
	render() {
		let index=this.props.index;
		let item=this.props.item;
		let checkboxClass = 'bx bx-checkbox';
		if (item.checked) {
			checkboxClass = 'bx bx-checkbox-checked';
		}

		let itemDisplay = <p><b>{item.todo}</b></p>;

		if (item.editing) {
			itemDisplay = (
				<TodoItemEdit
					index={index}
					word={this.props.item.todo}
					updateItem={this.props.updateItem}>
				</TodoItemEdit>
			);
		}
		return (
			<li className="list-group-item">
				<div className="row">
					<div className="col-1">
						<i className={checkboxClass} onClick={() => {this.props.checkItem(index)}}></i>
					</div>
					<div className="col-9">
						{itemDisplay}
						<p>Posted on {item.created_at}</p>
					</div>
					<div className="col-1">
						<i className='bx bxs-edit-alt' onClick={() => {this.props.editItem(index)}}></i>
					</div>
					<div className="col-1">
						<i className='bx bxs-trash-alt' onClick={() => {this.props.removeItem(index)}}></i>
					</div>
				</div>
			</li>
		)
	}
}

class TodoItemEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			validated: true,
			word: this.props.word
		};
		this.validate=this.validate.bind(this);
		this.updateItem=this.updateItem.bind(this);
	}
	validate(e) {
		let value = e.target.value;
		let validated = false;
		this.setState({word:value});
		if (value.length <= 0 || value.length > 50) {
			validated = false;
		} else {
			validated = true;
		}
		this.setState({
			validated: validated
		})
	}
	updateItem(e){
		e.preventDefault();
		if (this.state.validated) {
			this.props.updateItem(e, this.props.index, this.state.word)
		}
	}
	render(){
		let index=this.props.index;
		let errorMessage = null;
		if (!this.state.validated) {
			errorMessage = <div className="alert alert-danger" role="alert">
				must not be empty and must be &lt; 50 characters
			</div>
		} else {
			errorMessage = null;
		}
		return (
			<form className="edit-form">
				<input type="text" className="form-control" value={this.state.word} onChange={this.validate}></input>
				<button type="submit" className="my-3 btn btn-primary" onClick={this.updateItem}>Edit</button>
				{errorMessage}
			</form>
		)
	}
}

ReactDOM.render(
	<TodoApp></TodoApp>
	, document.getElementById('root')
);

