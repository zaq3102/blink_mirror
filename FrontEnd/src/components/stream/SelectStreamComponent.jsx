import React, { useEffect, useState } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import io from "socket.io-client";
import axios from "axios"
import { useRef } from "react";
const socket = io.connect("http://localhost:4000");
const apiURL = "http://localhost:8080";

function SelectStreamComponent(props) {

  const [showForm, setShowForm] = useState(false);
  const [mutedSound, setMutedSound] = useState(false);
  const [selected, setSelected] = useState(false);
  const [firstLoveCount, setFirstLoveCount] = useState(0);
  const toggleSound = () => {
    setMutedSound(!mutedSound);
  };

  const onMouseOver = () => {
    setShowForm(true);
  };

  const onClick = async () => {
    setSelected(true);
    // props.onSelect();
    setShowForm(true);
    props.onSelect();
    // console.log("picked")
    // try{
    //   const res = axios.get(apiURL+"/api/v1/game/voteFirst", {params : {
    //     "player_seq" : 1,
    //     "first_choice" : 3
        
    //   }})
    //   console.log(res);
    //   console.log("good");
    // }
    // catch{
    //   console.log("erorororororor")
    // }
    
   
    socket.emit("selectFirst");
  };
  socket.on("selectFirst", (cnt) => {
    setFirstLoveCount(cnt.firstCount);
    if (cnt.firstCount === props.participantNum) {
      props.mode(3);
    }
  });

  const onMouseLeave = () => {
    if (selected) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  return (
    <div>
      <button
        disabled={props.disabled}
        className="OT_widget-container"
        onMouseOver={onMouseOver}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
      >
        {props.user !== undefined &&
        props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent user={props.user} mutedSound={!mutedSound} />

            <div id="statusIcons">
              {!props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOffIcon id="statusCam" />
                </div>
              ) : null}

              {!props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOffIcon id="statusMic" />
                </div>
              ) : null}
              {showForm ? (
                selected ? (
                  <div id="LikeIcon">
                    <FavoriteIcon id="statusLike" />
                  </div>
                ) : (
                  <FavoriteBorderIcon />
                )
              ) : null}
              {/* //   selected ? (
            //       <div id="LikedIcon">
            //           <FavoriteIcon id="statusLike"/>
            //       </div>
            //   ): 
            //   <div id="LikeIcon">
            //       <FavoriteBorderIcon id="statusLike"/>
            //   </div> */}
            </div>

            <div>
              {!props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={toggleSound}>
                  {mutedSound ? (
                    <VolumeOffIcon color="secondary" />
                  ) : (
                    <VolumeUpIcon />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </button>
    </div>
  );
}
export default SelectStreamComponent;
