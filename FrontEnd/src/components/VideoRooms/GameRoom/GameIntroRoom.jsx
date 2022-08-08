import React, { useState } from "react";

import "./GameRoom.css";
import GameIntro from "../../modals/GameIntro/GameIntro";
import StreamComponent from "../../stream/StreamComponent";
import Game from "../../modals/Game/Game";
function GameRoom(props) {
  //variables
  const localUser = props.localUser;
  const [open, setOpen] = useState(true);
  const [gameOpen, setGameOpen] = useState(false);
  //function
  setTimeout(() => {
    setOpen(false);
  }, 5000);
  const setMode = (num) => {
    props.setMode(num);
  };
  const setGameStart = () => {
    setGameOpen(true);
  };

  const setGameEnd = () => {
    setGameOpen(false);
  };

  return (
    <>
      <GameIntro
        participantNum={props.participantNum}
        open={open}
        role={props.localUser.getRole()}
        setGameStart={setGameStart}
      />
      <Game
        participantNum={props.participantNum}
        open={gameOpen}
        setGameEnd={setGameEnd}
        setMode={setMode}
      />
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser">
          <StreamComponent user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id="remoteUsers"
        >
          <StreamComponent
            user={sub}
            streamId={sub.streamManager.stream.streamId}
          />
        </div>
      ))}
    </>
  );
}

export default GameRoom;
