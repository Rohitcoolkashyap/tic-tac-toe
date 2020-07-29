import React ,{Component} from 'react'
import Square from "./square";

class Board extends React.Component{
    renderSquare(i){
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
    }
    render() {
        return(
            <div className="container">
                <div className="border-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="border-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="border-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <button onClick={this.props.onReset} className='btn btn-success m-4 p-2'>reset</button>
            </div>
        )
    }
}
export default Board