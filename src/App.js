import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoForm from './modules/TodoForm';
import $ from "jquery";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// daftar: [
			// 	{ judul: 'Nyuci Baju', selesai: false },
			// 	{ judul: 'Sapu Halaman', selesai: true },
			// 	{ judul: 'Lap Meja', selesai: false },
			// 	{ judul: 'Masak', selesai: false },
			// ],
			daftar: this.load(),
		}
		this.new_item = this.new_item.bind(this);
	}

	new_item(text) {
		this.setState({
			daftar: this.state.daftar.concat({
				judul: text,
				selesai: false,
				key: (new Date()).getTime(),
			}),
		});
	}

	update_daftar(daftar) {
		this.setState({ daftar });
	}

	componentDidUpdate() {
		this.save();
	}

	local_key = 'parksama-tugas';
	load() {
		var result = [];
		var tugas = localStorage.getItem(this.local_key);

		try {
			result = JSON.parse(tugas) || [];
		} catch (error) { }

		return result;
	}

	save() {
		localStorage.setItem(this.local_key, JSON.stringify(this.state.daftar));
	}

	render() {
		return (
			<div className="App">
				<Nav />

				<div className="container">

					<div className="text-center">
						<h1>Selamat datang</h1>
						<p className="lead">Ini adalah aplikasi todo list, silahkan dipakai.</p>
					</div>

					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<TodoForm onHasil={this.new_item} />
							<TodoList daftar={this.state.daftar} updateDaftar={this.update_daftar.bind(this)}>
								<h3>Daftar Tugas</h3>
							</TodoList>
						</div>
					</div>

					<hr/>
					<p>Parksama Desu @ 2018</p>
				</div>
			</div>
		);
	}
}

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			percentage: 0,
		}
	}

	componentDidMount() {
		this.recalc();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps !== this.props) {
			this.recalc();
		}
	}

	recalc() {
		this.setState({
			percentage: Math.round(this.props.daftar.filter(item => {
				return item.selesai;
			}).length / this.props.daftar.length * 100) || 0,
		});
	};

	on_check(event) {
		var checkbox = $(event.currentTarget);
		var id = checkbox.data('id');
		// this.props.daftar[id].selesai = event.currentTarget.checked;
		const daftar = this.props.daftar;
		daftar[id].selesai = event.currentTarget.checked;
		this.props.updateDaftar(daftar);

		this.recalc()
	};

	on_hapus(key) {
		const daftar = this.props.daftar;
		daftar.splice(key, 1);
		this.props.updateDaftar(daftar);
	}

	render() {
		return (
			<div className="todolist" >
				{this.props.children}
				<div className="list-group">
					{this.props.daftar.map((item, key) => (
						<div className={'list-group-item checkbox ' + (item.selesai ? 'list-group-item-success' : '')} key={item.key}>
							<label>
								<input
									type="checkbox"
									name="selesai"
									checked={item.selesai}
									data-id={key}
									onChange={this.on_check.bind(this)} />
								{item.judul}
							</label>
							<i className="fas fa-times list-remove-btn" title="Hapus tugas" onClick={this.on_hapus.bind(this, [key])}></i>
						</div>
					))}
				</div>
				<ProgressBar percentage={this.state.percentage} />
			</div >
		);
	}
}

const ProgressBar = (props) => {
	return (
		<div className="progress">
			<div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style={{ minWidth: '2em', width: props.percentage + '%' }}>
				{props.percentage}%
					</div>
		</div>
	);
}

const Nav = (props) => {
	return (
		<nav className="navbar navbar-inverse navbar-fixed-top">
			<div className="container">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand" href="/">Tugasku</a>
				</div>
				<div id="navbar" className="collapse navbar-collapse">
					<ul className="nav navbar-nav">
						<li className="active"><a href="/">Home</a></li>
						<li><a href="/">About</a></li>
						<li><a href="/">Contact</a></li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default App;
