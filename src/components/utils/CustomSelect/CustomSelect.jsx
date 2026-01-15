import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css'


import clsx from 'clsx';

function CustomSelect({ label, options, selected, onChange, className, id, visibleSelects }) {

    const [open, setOpen] = useState(false);
    const selectId = id || `custom-select-${Math.random()}`;



    useEffect(() => {
        const body = document.body;

        if (open) {
            body.addEventListener('click', selectClickHandler)
        } else {
            body.removeEventListener('click', selectClickHandler)
        }

        return () => {
            body.removeEventListener('click', selectClickHandler)
        }
    }, [open]);



    const selectClickHandler = (event, option, index) => {

        if (open && !event.target.closest('.custom-select')) {
            setOpen(false)
            return
        }

        if (open) {
            onChange(option)
            setOpen(false)
            return
        }

        if (!open) {
            setOpen(true)
        }


    }

    const optionClassName = clsx('custom-select__list', {
        'custom-select__list--open': open
    })

    return (
        <div className="custom-select">
            <label htmlFor={selectId}>{label}</label>
            <div className="custom-select__list-container">
                <ul className={optionClassName}>
                    {options.map((option, index) => (
                        <li
                            className={clsx('custom-select__option-item', {
                                'custom-select__option-item--selected': selected === option
                            })}
                            key={index}>
                            <button
                                className='custom-select__option'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    selectClickHandler(e, option, index)
                                }}
                            >{option}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CustomSelect