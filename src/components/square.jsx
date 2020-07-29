import React from 'react';
function Square({ onClick, value }) {
    return (
        <button onClick={onClick} className="square">
            {value}
        </button>
    );
}
export default Square;