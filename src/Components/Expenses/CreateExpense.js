import React from 'react'

export default function CreateExpense() {
  return (
    <div className='create-expense-container'>
        <form>
            <div className='form-element span-two'>
                <input type="text" name="title" ></input>
            </div>
            <div className='form-element span-two'>
                <input type="text" name="amount" ></input>
            </div>
            <div className='form-element span-two'>
                <input type="text" name="type" ></input>
            </div>
            <div className='form-element'>
                <input type="text" name="date" ></input>
            </div>
            <div className='form-element'>
                <input type="checkbox" name="recurring" ></input>
            </div>
            <button className='add-image'>Insert Picture</button>
            <button className='add-expense'>Add</button>
        </form>
    </div>
  )
}
