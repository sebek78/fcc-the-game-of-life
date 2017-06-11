var app = document.getElementById('app');
var boardWidth = 10;
var boardHeight = 6;
var a = boardWidth;
var b = boardHeight;

var board = [];
var initialBoard=[];
for (var i=0; i<a*b;i++) {
  var random = Math.floor(Math.random()*100+1);
  //console.log(random);
  if (random>40) {
    initialBoard.push(false);
  } else {
    initialBoard.push(true);
  }
}

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">Buttons<hr /></div>
    );
  }
}

class Board extends React.Component {
  render () {
    var cells = this.props.board;
    return (
      <div className="board">{cells}</div>
    );
  }
}

class Events extends React.Component {
  render() {

    return null;
  }
}

class App extends React.Component {
  render() {

    for (var i=0; i<a*b; i++) {
      var cellStatus;
      if (initialBoard[i]===true) {
        cellStatus="living cell";
      } else {
        cellStatus = "dead cell";
      }
      var elementToPush = <div className={cellStatus} id={i} key={i} >{i}</div>;
      board.push(elementToPush);
    }
    console.log(board);

    return (
      <div className="box">
        <Events />
        <Menu />
        <Board board={board} />
      </div>
    );
  }
}

ReactDOM.render(<App />, app);
