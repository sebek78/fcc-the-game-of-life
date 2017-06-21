var app = document.getElementById('app');
var boardWidth = 70;
var boardHeight = 50;
var a = boardWidth;
var b = boardHeight;
var board = [];
var boardNextGeneration=[];
var boardToSend=[];
var initialBoard=[];
var gameStatus = false;
var intervalID;

for (var i=0; i<a*b;i++) {
  var random = Math.floor(Math.random()*100+1);
  if (random>30) {
    initialBoard.push(0);
  } else {
    initialBoard.push(1);
  }
}

class Board extends React.Component {
  render () {
    var cells = this.props.board;
    return (
      <div>
        <div className="menu">
          <button type="button" className="btn" onClick={this.props.gameContinue} >Start</button>
          <button type="button" className="btn" onClick={this.props.stop} >Stop</button>
          <button type="button" className="btn" onClick={this.props.reset} >Clear</button>
          <div className="description">Game of Life <br />Generations: {this.props.generation}</div>
        </div>
          <div className="board" onClick={this.props.changeCell}>{cells}</div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: initialBoard,
      generations: 0
    }
    this.gameContinue = this.gameContinue.bind(this);
    this.gameStops = this.gameStops.bind(this);
    this.gameReset = this.gameReset.bind(this);
    this.changeCell = this.changeCell.bind(this);
  }

  changeCell(e) {
    if (gameStatus===false) {
      console.log(e.target.id);
      var cellID = e.target.id;
      if (board[cellID]===1) {
        board[cellID]=0;
      } else {
        board[cellID]=1;
      }
      this.setState({board: board})
    }
  }

  gameContinue(){
    if (gameStatus===false) {
        gameStatus = true;
        console.log("start");
        intervalID = setInterval(() => this.tick(), 333);
    }
  }

  gameStops() {
    if (gameStatus===true) {
        clearInterval(intervalID);
        gameStatus = false;
        console.log("stop");
    }
  }

  gameReset() {
      clearInterval(intervalID);
      gameStatus = false;
      board=[];
      console.log("reset");
      for (var i=0; i<a*b;i++) {
        board.push(0);
      }
      let emptyBoard = board;
      const clearGenerations = 0;
      this.setState({ board: emptyBoard,
        generations: clearGenerations });
  }

  tick() {
      generate();
      board=[];
      let newGeneration = this.state.generations + 1;
      this.setState({
        board: boardNextGeneration,
        generations: newGeneration
      });
      boardNextGeneration=[];
  }

  componentDidMount() {
    intervalID = setInterval(() => this.tick(), 333);
  }

  componentWillUnmount() {
    clearInterval(intervalID);
  }

  render() {
    var boardToShow = this.state.board;
    boardToSend=[];
      for (var i=0; i<a*b; i++) {
        var cellStatus;
        if (boardToShow[i]===1) cellStatus="living cell";
        if (boardToShow[i]===0) cellStatus = "dead cell";
        var elementToPush = <div className={cellStatus} id={i} key={i} ></div>;
        boardToSend.push(elementToPush);
        board.push(boardToShow[i]);
      }
    return (
      <div className="box">
        <Board board={boardToSend} generation={this.state.generations} gameContinue={this.gameContinue}
        stop={this.gameStops} reset={this.gameReset} changeCell={this.changeCell} />
      </div>
    );
  }
}

function newCell(n,s) {
  if (s===0 && n !== 3) { boardNextGeneration.push(0); }    //nothing
  if (s===0 && n === 3) { boardNextGeneration.push(1); }    // born
  if (s===1 && n <2 )   { boardNextGeneration.push(0); }   // dead-underpopulation
  if (s===1 && (n===2 || n===3)) { boardNextGeneration.push(1); }   // still lives
  if (s===1 && n>3 )  { boardNextGeneration.push(0); }    // dead-overpopulation
}

function generate() {
  for (var i=0; i<a*b; i++) {
    var neighborhood=0;
    if (i===0) {                                  // board: top-left corner
      if(board[ (i-a)+(a*b)   ] === 1) neighborhood++; //N direction for this cell
      if(board[ (i-a+1)+(a*b) ] === 1) neighborhood++; //NE
      if(board[ i+1           ] === 1) neighborhood++; //E
      if(board[ i+a+1         ] === 1) neighborhood++; //SE
      if(board[ i+a           ] === 1) neighborhood++; //S
      if(board[ (i-1+a) + a   ] === 1) neighborhood++; //SW
      if(board[ (i-1)+a       ] === 1) neighborhood++; //W
      if(board[ (i-1)+(a*b)   ] === 1) neighborhood++; //NW
      newCell(neighborhood,board[i]);
    }
    else if (i>0 && i < a-1) {                    // first(top) row without corners
      if(board[ (i-a)+(a*b)   ] === 1) neighborhood++; //N direction for this cell
      if(board[ i+1+(a*(b-1)) ] === 1) neighborhood++; //NE
      if(board[ i+1           ] === 1) neighborhood++; //E
      if(board[ i+a+1         ] === 1) neighborhood++; //SE
      if(board[ i+a           ] === 1) neighborhood++; //S
      if(board[ (i-1+a)       ] === 1) neighborhood++; //SW
      if(board[ (i-1)         ] === 1) neighborhood++; //W
      if(board[ (i-1-a)+(a*b) ] === 1) neighborhood++; //NW
      newCell(neighborhood,board[i]);
    }
    else if (i===a-1) {                           //top-rigth corner
      if(board[ (i-a)+(a*b)    ] === 1) neighborhood++; //N direction for this cell
      if(board[ (i-a+1)+(a*b)-a ] === 1) neighborhood++; //NE
      if(board[ i+1-a           ] === 1) neighborhood++; //E
      if(board[ i+1         ] === 1) neighborhood++; //SE
      if(board[ i+a           ] === 1) neighborhood++; //S
      if(board[ (i-1+a)    ] === 1) neighborhood++; //SW
      if(board[ (i-1)       ] === 1) neighborhood++; //W
      if(board[ (i-1-a)+(a*b)   ] === 1) neighborhood++; //NW
      newCell(neighborhood,board[i]);
    }
    else if ((i+1)%a===0 && i!==a-1 && i!==((a*b)-1)) { //right column without corners
      if(board[ (i-a)          ] === 1) neighborhood++; //N direction for this cell
      if(board[ (i-a+1)-a        ] === 1) neighborhood++; //NE
      if(board[ i+1 -a          ] === 1) neighborhood++; //E
      if(board[ i+1         ] === 1) neighborhood++; //SE
      if(board[ i+a           ] === 1) neighborhood++; //S
      if(board[ (i-1+a)    ] === 1) neighborhood++; //SW
      if(board[ (i-1)       ] === 1) neighborhood++; //W
      if(board[ (i-1-a)   ] === 1) neighborhood++; //NW
      newCell(neighborhood,board[i]);
    }
    else if (i===((a*b)-1)) {                         //bottom-rigth corner
      if(board[ (i-a)          ] === 1) neighborhood++; //N direction for this cell
      if(board[ (i-a+1)-a        ] === 1) neighborhood++; //NE
      if(board[ i+1-a          ] === 1) neighborhood++; //E
      if(board[ i+1 - (a*b)         ] === 1) neighborhood++; //SE
      if(board[ i+a  -(a*b)         ] === 1) neighborhood++; //S
      if(board[ (i-1+a)-(a*b)    ] === 1) neighborhood++; //SW
      if(board[ (i-1)       ] === 1) neighborhood++; //W
      if(board[ (i-1-a)   ] === 1) neighborhood++; //NW
      newCell(neighborhood,board[i]);
    }
    else if (i<((a*b)-1) && i >((a*b)-a)) {           //last(bottom) row without corners
      if(board[ (i-a)          ] === 1) neighborhood++; //N direction for this cell
      if(board[ (i-a+1)        ] === 1) neighborhood++; //NE
      if(board[ i+1           ] === 1) neighborhood++; //E
      if(board[ i+a+1-(a*b)    ] === 1) neighborhood++; //SE
      if(board[ i+a -(a*b)          ] === 1) neighborhood++; //S
      if(board[ (i-1+a)-(a*b)    ] === 1) neighborhood++; //SW
      if(board[ (i-1)       ] === 1) neighborhood++; //W
      if(board[ (i-1-a)   ] === 1) neighborhood++; //NW
      newCell(neighborhood,board[i]);
    }
    else if (i===((a*b)-a)) {                         // bottom-left corner
      if(board[ (i-a)          ] === 1) neighborhood++; //N direction for this cell
      if(board[ (i-a+1)        ] === 1) neighborhood++; //NE
      if(board[ i+1           ] === 1) neighborhood++; //E
      if(board[ i+a+1-(a*b)         ] === 1) neighborhood++; //SE
      if(board[ i+a-(a*b)           ] === 1) neighborhood++; //S
      if(board[ (i-1+a)-((b-1)*a)    ] === 1) neighborhood++; //SW
      if(board[ (i-1)+a       ] === 1) neighborhood++; //W
      if(board[ (i-1-a)+a   ] === 1) neighborhood++; //NW
      newCell(neighborhood,board[i]);
    }
    else if (i%a===0 && i!==0 && i!==((a*b)-a)) {     // left column without cornerns
      if(board[ (i-a)          ] === 1) neighborhood++; //N direction for this cell
      if(board[ (i-a+1)        ] === 1) neighborhood++; //NE
      if(board[ i+1           ] === 1) neighborhood++; //E
      if(board[ i+a+1         ] === 1) neighborhood++; //SE
      if(board[ i+a           ] === 1) neighborhood++; //S
      if(board[ (i-1+a)+a    ] === 1) neighborhood++; //SW
      if(board[ (i-1)+a       ] === 1) neighborhood++; //W
      if(board[ (i-1-a)+a   ] === 1) neighborhood++; //NW
      newCell(neighborhood,board[i]);
      //console.log("Lcol:",i,neighborhood,board[i]);
    }
    else {                                            // board: inner cells
      if(board[ (i-a)          ] === 1) neighborhood++; //N direction for this cell
      if(board[ (i-a+1)        ] === 1) neighborhood++; //NE
      if(board[ i+1           ] === 1) neighborhood++; //E
      if(board[ i+a+1         ] === 1) neighborhood++; //SE
      if(board[ i+a           ] === 1) neighborhood++; //S
      if(board[ (i-1+a)    ] === 1) neighborhood++; //SW
      if(board[ (i-1)       ] === 1) neighborhood++; //W
      if(board[ (i-1-a)   ] === 1) neighborhood++; //NW
      newCell(neighborhood,board[i]);
    }
  }
}

ReactDOM.render(<App />, app);
gameStatus = true;
