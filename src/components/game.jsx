import React from 'react';
import Board from "./board";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            isNext: true
        };
    }

    handleClick = i => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            isNext: !this.state.isNext,
        });
    };
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };
    resetGame = () => {
        let history;
        history = [{
            squares: Array(9).fill(null)
        }];
        this.setState({
            history,
            isNext: true
        });
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'go to move #' + move :
                'go to game start';
            return (
                <li key={move}>
                    <button className="jumpto" onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });
        let status;
        if (winner)
            status = 'winner : ' + winner;
        else
            status = 'Player Turn : ' + (this.state.isNext ? 'X' : 'O');
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        onReset={() => this.resetGame()}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;