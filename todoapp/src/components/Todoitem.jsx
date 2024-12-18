import React from 'react'

const Todoitem = ({ title, description, isCompleted, updateHandler, deleteHandler, id }) => {

    return (
        <div className='maincontainer'>

            <div className='todoitems' >
                <div className='title'>
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
                <div className='btns'>
                    <input
                        onChange={() => updateHandler(id)} type='checkbox'
                        checked={isCompleted} />
                    <button
                        className='btn'
                        onClick={() => deleteHandler(id)} >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Todoitem
