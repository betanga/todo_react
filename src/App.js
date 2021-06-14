import React, { useState } from 'react';
import Taks from "./components/Task"
import './index.css';

function App() {
  
  const [ title, setTitle ] = useState( "" )
  const [ checked, setChecked ] = useState( false )

  const [ tasks, setTasks ] = useState( [] )
  const [ filter, setFilter ] = useState( "all" );

  const handleDelete = ( i ) => {
    const tasksFilter = tasks.filter( ( task, index ) => {
      return index !== i
    } )

    setTasks( tasksFilter );
  }

  const handleSubmit = ( e ) => {

    e.preventDefault()

    if( !title ){
      return false;
    }

    setTasks( [
      ...tasks,
      {
        name: title,
        checked: checked,
      }
    ] );

    setTitle( "" );
    setChecked( false );
  }

  const handleToggleChecked = ( i, checkedValue ) => {
    const _tasks = tasks.map( ( task, index ) => {
      if( index === i ){
        return {
          ...task,
          checked: checkedValue
        }
      } else {
        return task
      }
    } )

    setTasks( _tasks );
  }

  const handleClearCompleted = () => {
    const tasksFilter = tasks.filter( ( task ) => {
      return !task.checked
    } )

    setTasks( tasksFilter );
  }

  const tasksFilter = () => {
    if( filter === "all" ){
      return tasks
    } else if( filter === "active" ){
      return tasks.filter( ( task ) => {
        return !task.checked
      } )
    } else {
      return tasks.filter( ( task ) => {
        return task.checked
      } )
    }
  }

  const tasksLeft = tasks.filter( taks => {
    return !taks.checked
  } ).length
  
  return (
    <div>
        <section>
            <div className="absolute">
                <img className="h-48 object-cover" src="/moon.jpg" alt="" width="1024"/>
            </div>
        </section>
        <div className="text-center pt-12">
            <div className="relative">
                <div>
                    <h1 className="text-3xl text-white pr-72 pl-1.5 font-bold">T O D O</h1>
                </div>
                <div className="">
                    <form onSubmit={ handleSubmit }>
                        <div className="bg-white rounded-x1 w-96 my-6 flex m-auto rounded items-center">
                            <input
                              type="checkbox"
                              className="ml-2 cursor-pointer"
                              checked={ checked }
                              onChange={ e => setChecked( !checked ) }
                            />
                            <input
                              value={ title }
                              className="border border-transparent py-2 px-3 w-full rounded outline-none"
                              type="text" 
                              placeholder="Ingresar texto"
                              onChange={ e => setTitle( e.target.value ) }
                            />
                        </div>
                    </form>
                </div>
            </div>
            <section className="relative w-96 m-auto block shadow">
              <div className="tasklist w-88 m-auto text-left cursor-pointer">
                  {
                    tasksFilter().length > 0 ? (
                      <React.Fragment>
                          { tasksFilter().map( (task, index) => (
                            <Taks
                              key={ index }
                              index={ index }
                              item={ task }
                              delete={ handleDelete }
                              toggle={ handleToggleChecked } 
                            />
                          ) ) }
                      </React.Fragment>
                    ) : (
                      <div className="bg-white rounded text-center border-b border-gray-200 py-3 text-lg text-gray-500 italic">
                        No hay tareas
                      </div>
                    )
                  }
              </div>
              <div className="flex justify-between w-84 py-2 m-auto rounded-b">
                  <div className="">
                      <p className="text-xs pt-0.5 pl-3 text-gray-400">
                          <span></span>
                          { tasksLeft } items left
                      </p>
                  </div>
                  <div>
                      <ul className="cursor-pointer flex">
                          <li
                            className={ `pl-2 text-sm font-medium ${ filter === "all" ? "text-blue-600" : "hover:text-black text-gray-500" }` }
                            onClick={ e => setFilter( "all" ) }
                          >All</li>
                          <li
                            className={ `pl-2 text-sm font-medium ${ filter === "active" ? "text-blue-600" : "hover:text-black text-gray-500" }` }
                            onClick={ e => setFilter( "active" ) }
                          >Active</li>
                          <li
                            className={ `pl-2 text-sm font-medium ${ filter === "completed" ? "text-blue-600" : "hover:text-black text-gray-500" }` }
                            onClick={ e => setFilter( "completed" ) }
                          >Completed</li>
                      </ul>
                  </div>
                  <div
                    onClick={ handleClearCompleted }
                    className="cursor-pointer text-sm pr-2 font-medium text-gray-500"
                  >
                      Clear Completed
                  </div>
              </div>  
            </section>
        </div>
    </div>
  );
}

export default App;
