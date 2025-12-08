import React from 'react';
import useStore from '../../store/useStore';
import './TestControl.css';

const TestControl = () => {
    const populateData = useStore((state) => state.populateData);
    const resetStore = useStore((state) => state.resetStore);

    return (
        <div className="test-control">
            <button className="test-control__btn" onClick={populateData}>
                Populate Test Data
            </button>
            <button className="test-control__btn test-control__btn--danger" onClick={resetStore}>
                Reset Data
            </button>
        </div>
    );
};

export default TestControl;
