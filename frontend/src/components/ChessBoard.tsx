import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

const ChessBoard = ({ board, socket, setBoard, chess }: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][],
  socket: WebSocket,
  setBoard: React.Dispatch<React.SetStateAction<({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]>>,
  chess: Chess
}) => {

  const [from, setFrom] = useState<null | Square>(null);

  return (
    <div className="">
      {board.map((row, i) => {
        return <div key={i} className="flex">
          {row.map((square, j) => {
            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
            // console.log(squareRepresentation); 
            return <div onClick={() => {
              if (!from) {
                setFrom(squareRepresentation);
              } else {
                socket.send(JSON.stringify({
                  type: MOVE,
                  payload: {
                    from,
                    to: squareRepresentation
                  }
                }))
                setFrom(null);
                chess.move({
                  from,
                  to: squareRepresentation
                });
                setBoard(chess.board());
                console.log({ from, to: squareRepresentation });
              }
            }}
              key={j} className={`w-16 h-16 ${((i + j) % 2) ? 'bg-green-500' : 'bg-green-200'}`}>
              <div className="w-full h-full pb-3 flex justify-center items-center">
                {square ? <img className="w-7" src={`/${square?.color === 'b' ? `B_${square?.type?.toUpperCase()}` : `W_${square?.type?.toUpperCase()}` }.png`}/> : null}
              </div>
            </div>
          })}
        </div>
      })}
    </div>
  )
}

export default ChessBoard
