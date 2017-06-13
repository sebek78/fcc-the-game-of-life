var app = document.getElementById('app');
var boardWidth = 30;
var boardHeight = 15;
var a = boardWidth;
var b = boardHeight;
var board = [];
var boardNextGeneration=[];
var boardToSend=[];
var initialBoard=[];

for (var i=0; i<a*b;i++) {
  var random = Math.floor(Math.random()*100+1);
  if (random>30) {
    initialBoard.push(0);
  } else {
    initialBoard.push(1);
  }
}
//console.log("init:",initialBoard);

class Menu extends React.Component {
  render() {
    return (
      <div className="menu"><button type="button" className="btn" onClick={this.props.changingBoard}>Click</button></div>
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


class App extends React.Component {
  render() {
    var boardToShow = this.props.newBoard;
    //console.log(boardToShow);
      for (var i=0; i<a*b; i++) {
        var cellStatus;
        if (boardToShow[i]===1) cellStatus="living cell";
        if (boardToShow[i]===0) cellStatus = "dead cell";
        var elementToPush = <div className={cellStatus} id={i} key={i} >{i}</div>;
        boardToSend.push(elementToPush);
        board.push(boardToShow[i]);
      }
      //console.log("b   :",board);
    return (
      <div className="box">
        <Menu changingBoard={this.changeBoard}/>
        <Board board={boardToSend} />
      </div>
    );
  }
}

function generate() {
//console.log("gen :", board);

function newCell(n,s) {
  if (s===0 && n !== 3) { boardNextGeneration.push(0); }    //nothing
  if (s===0 && n === 3) { boardNextGeneration.push(1); }    // born
  if (s===1 && n <2 )   { boardNextGeneration.push(0); }   // dead-underpopulation
  if (s===1 && (n===2 || n===3)) { boardNextGeneration.push(1); }   // still lives
  if (s===1 && n>3 )  { boardNextGeneration.push(0); }    // dead-overpopulation
}

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
    //console.log("TLc:",i,neighborhood,board[i]);

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
    //console.log("TOProw:",i,neighborhood,board[i]);
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
    //console.log("TRcor:",i,neighborhood,board[i]);
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
    //console.log("Rcol:",i,neighborhood,board[i]);
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
    //console.log("RBRcor:",i,neighborhood,board[i]);
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
    //console.log("Brow:",i,neighborhood,board[i]);
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
    //console.log("BLcor:",i,neighborhood,board[i]);
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
    //console.log("inner:",i,neighborhood,board[i]);
  }
}
//return console.log(boardNextGeneration);

}

function tick() {
    generate();
    board=[];
    ReactDOM.render(<App newBoard={boardNextGeneration} />, app);
    boardToSend=[];
    boardNextGeneration=[];
}

ReactDOM.render(<App newBoard={initialBoard} />, app);
boardToSend=[];
setInterval(tick, 1000);
