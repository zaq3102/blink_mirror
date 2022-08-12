import React, { useState } from "react";

import "./SelectRoom.css";

import SelectStreamComponent from "../../stream/SelectStreamComponent";
import StreamComponent from "../../stream/StreamComponent";
import FirstSelect from "../../modals/FirstSelect/FirstSelect";

function SelectRoom(props) {
  //variables

  const localUser = props.localUser;
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(true);
  //function
  const onSelect = () => {
    setSelected(true);
    console.log("hi");
  };
  const setMode = (mode) => {
    props.setMode(mode);
    console.log("modeChanged", mode);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <FirstSelect open={open} handleClose={handleClose} />
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser">
          <StreamComponent user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers" + i}
        >
          <SelectStreamComponent
            localUser={localUser}
            participantNum={props.participantNum}
            onSelect={onSelect}
            user={sub}
            streamId={sub.streamManager.stream.streamId}
            disabled={selected}
            mode={setMode}
          />
        </div>
      ))}
    </>
  );
}

export default SelectRoom;
