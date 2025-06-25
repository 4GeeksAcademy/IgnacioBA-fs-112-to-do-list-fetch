import React, { useState, useEffect } from "react";


//create your first component


const Home = () => {

	const [taskList, setTaskList] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [userName, setUserName] = useState("");
	const [userReady, setUserReady] = useState(false);

	const handleUserSubmit = () => {
		if (userName.trim() === "") return;
		getTaskList(userName);
	};

	function getTaskList(user) {
		fetch(`https://playground.4geeks.com/todo/users/${user}`, { method: "GET" })// buscar informacion en la url

			.then((response) => {
				if (response.ok) return response.json();
				throw new Error("Usuario no existe");
			})
			.then((data) => {
				setTaskList(data.todos);
				setUserReady(true);
			})
			.catch(() => {
				createUser(user);
			});
	}

	function createUser(user) {
		fetch(`https://playground.4geeks.com/todo/users/${user}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				if (response.ok) {
					console.log("Usuario creado");
					getTaskList(user);
				} else {
					console.error("No se pudo crear el usuario");
				}
			})
			.catch((error) => console.error(error));
	}

	function createTask(user) {

		fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
			method: "POST",
			body: JSON.stringify({
				"label": newTask,
				"is_done": false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				console.log(response);
				if (response.status === 201) {
					setNewTask("");
					getTaskList(userName);
				}

				return response.json()
			})
			.then((data) => console.log(data))
			.catch((error) => console.log(error))


	}
	function deleteTask(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {//cuando no se localiza el id
			method: "DELETE"
		})
			.then(() => getTaskList(userName))
			.catch((error) => console.log(error));
	}

	useEffect(() => {
		console.log("Tareas actuales:", taskList);
	}, [taskList]);
	

	return (
		<div className="container text-center mt-5">
			{!userReady ? (
				<div>
					<h2>Introduce tu nombre para cargar tus tareas:</h2>
					<input
						className="form-control w-50 mx-auto"
						type="text"
						placeholder="Nombre de usuario"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleUserSubmit()}
					/>
					<button className="btn btn-primary mt-3" onClick={handleUserSubmit}>
						Acceder
					</button>
				</div>
			) : (
				<div>

					<h2>Lista de tareas de {userName}</h2>
					<input
						type="text"
						className="form-control my-3"
						placeholder="Añadir tarea"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && newTask.trim() !== "") {
								createTask(userName);
							}
						}}
					/>
					<ul className="list-group w-50 mx-auto">
						{taskList.map((item) => (
							<li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
								{item.label}
								<button className="btn btn-sm btn-danger" onClick={() => deleteTask(item.id)}>❌</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Home;