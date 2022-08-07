import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};
const socket = io.connect("http://localhost:4000");
const Timer = (props) => {
  // 아무것도 입력하지 않으면 undefined가 들어오기 때문에 유효성 검사부터..
  const tempMin = props.min ? parseInt(props.min) : 0;
  const tempSec = props.sec ? parseInt(props.sec) : 0;
  // 타이머를 초단위로 변환한 initialTime과 setInterval을 저장할 interval ref
  const initialTime = useRef(tempMin * 60 + tempSec);
  const interval = useRef(null);

  const [sec, setSec] = useState(padNumber(tempSec, 2));
  const [min, setMin] = useState(padNumber(tempMin, 2));
  const [discussCount, setDiscussCount] = useState(0);
  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setMin(padNumber(parseInt(initialTime.current / 60), 2));
      setSec(padNumber(initialTime.current % 60, 2));
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);
  //타이머 끝났을 때 결과룸으로 보내주는 함수
  useEffect(() => {
    socket.emit("discussCount");
  }, []);
  socket.on("discussCount", (cnt) => {
    setDiscussCount(cnt.discussCount);
  });

  // 초가 변할 때만 실행되는 useEffect
  // initialTime을 검사해서 0이 되면 interval을 멈춘다.
  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current);

      if (discussCount === 12) {
        props.setMode(6);
        console.log("go to 6");
      } else {
        props.setMode(5);
        console.log("go to 5");
      }
    }
  }, [sec]);

  return (
    <div>
      {min} : {sec}
    </div>
  );
};

export default Timer;