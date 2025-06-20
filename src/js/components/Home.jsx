import React, {useState, useEffect} from "react";


//create your first component


const Home = () => {

	const [taskList, setTaskList]=useState([]);

	function getTaskList() {
		fetch('https://playground.4geeks.com/todo/users/igna',{method:"GET"})// buscar informacion en la url
		.then((response)=>{
			return response.json()}) // si llega una respuesta prometo que la convierto en un formato utilizable JSON
		.then((data)=>setTaskList(data.todos))
		//.then((data)=>setCharacters(data.results)) // Prometo que si el formato a json sale bien lo guardo en un espacio
		.catch((error)=>console.log(error)) // si algo sale, lo aviso
	}

	

	useEffect(()=>{
		//codigo que queremos que se ejecute cuando se cargue el componente
		{taskList.map((item, index) => (
                    <li key={index}>{item.label}</li>
                ))}
		getTaskList()
	},[])
	console.log(taskList);

	return (
		<div className="text-center">
            
		
			
		</div>
	);
};

export default Home;