import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
type StateType = {
    name: string,
    age: number
}

type PropsType = {
    name: string,
    age: number
}
Component<PropsType,StateType>*/
/**
 * 也可以这样写
 */
//Component  参数<props,state, 任意值>
/*class Square extends Component<{ value: string ,onClick:any}> {

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
}*/
function Square(props: any) {
    return (
        <button className="square" style={props.style} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends Component<{ squares: string[], onClick: any, winLine: number[] }> {

    renderSquare(i: number) {
        const winnerHeightLineCss = {backgroundColor: 'yellow'};
        return <Square key={i}
                       style={this.props.winLine.indexOf(i) > -1 ? winnerHeightLineCss : {}}
                       value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (<div>
            {
                Array(3).fill(null).map((number, index) => {
                    return (<div key={index} className="board-row">
                        {
                            [index * 3, index * 3 + 1, index * 3 + 2].map((number) => {
                                return this.renderSquare(number)
                            })
                        }
                    </div>)

                })
            }
        </div>)

    }
}

type StateType = {
    history: any[],
    stepNumber: number,
    move: number,
    sortAsc: boolean,
    xIsNext: boolean,
}

class Game extends Component<object, StateType> {
    lines: any[];

    constructor(props: any) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                number: 0,
                winLine: []
            }],
            move: 0,
            sortAsc: true,
            stepNumber: 0,
            xIsNext: true,
        };
        this.lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    }

    getWinLine(squares: number[]) {
        for (let i = 0; i < this.lines.length; i++) {
            const [a, b, c] = this.lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return this.lines[i];
            }
        }
        return [];
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winLine = this.getWinLine(squares);
        if (winLine.length > 0 || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                number: i,
            }]),
            move: 0,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winLine = this.getWinLine(current.squares)
        let winner;
        if (winLine.length > 0) {
            winner = winLine[current.squares[0]];
        }

        let historyCopy = history;
        if (!this.state.sortAsc) {
            historyCopy = history.map((step) => step);
            //const start = historyCopy.shift();
            historyCopy.reverse();
            //historyCopy.unshift(start);
        }
        const heightLightCss = {
            fontWeight: 'bolder',
            border: '2px solid black',
            borderRadius: '3px'
        };
        const moves = historyCopy.map((step, move) => {
            if (!this.state.sortAsc) {
                move = historyCopy.length - 1 - move;
            }
            const stepPlayer = step.squares[step.number];
            const stepRow = Math.ceil((step.number + 1) / 3);
            const stepCol = (step.number + 1) % 3;
            const buttonCss = move && move === this.state.move ? heightLightCss : {};
            const desc = move ?
                'Go to move #' + move + 'when Player ' + stepPlayer + ' step at row' + stepRow + ' col' + (stepCol || 3) :
                'Go to game start';
            return (
                <li key={move}>
                    <button style={buttonCss} onClick={() => {
                        this.setState({
                            move: move,
                        });
                        this.jumpTo(move)
                    }}>{desc}</button>
                </li>
            );
        });

        let sorts;
        if (moves.length > 1) {
            sorts = (
                <div>
                    <button style={this.state.sortAsc ? {} : heightLightCss} onClick={() => {
                        this.setState({sortAsc: false})
                    }}>desc
                    </button>
                    <button style={this.state.sortAsc ? heightLightCss : {}} onClick={() => {
                        this.setState({sortAsc: true})
                    }}>asc
                    </button>
                </div>
            );
        }

        let status;
        if (winner) {

            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winLine={winLine}
                        onClick={(i: number) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{sorts}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
