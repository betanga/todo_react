import React from "react";

const Task = ( { item, index, delete: deleteHandle, toggle } ) => {
    
    const handleDelete = ( e ) => {
        e.preventDefault()
        deleteHandle( index )
    }

    const handleToggle = () => {
        toggle( index, !item.checked )
    }

    return (
        <div className="relative items-center py-2 flex border-b border-gray-200 p-2 bg-white rounded-t hover:bg-blue-100">
            <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={ item.checked }
                onChange={ handleToggle }
            />
            <p
                className={ `truncate w-full pr-6 ${ item.checked ? "line-through text-gray-500" : "" }` }
            >{ item.name }</p>
            <button className="absolute right-3 text-xl focus:outline-none" onClick={ handleDelete }>&times;</button>
        </div>
    )
}

export default Task;