import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import a5 from "../../../assets/a5.png";
const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#A6095D"),
  // lineHeight: "44px",
  borderRadius: "30px",
  fontSize: "20px",
  color: "white !important",
  // padding: "9.5px 16px",
  // height: 40px;
  // padding: 0 14px 0 0;
  position: "absolute",
  top: "100%",
  left: "32.5%",
  maxWidth: "35%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#A6095D",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

const backdrop = {
  visible: {
    opacity: 1,
  },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "25vh",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
function FirstSelect(props) {
  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        {props.open && (
          <motion.div
            className="backdrop"
            variants={backdrop}
            animate="visible"
            initial="hidden"
            exit="hidden"
            style={{ zIndex: "5555" }}
          >
            <motion.div
              className="modal"
              variants={modal}
              style={{
                borderRadius: "3vw",
                border: "1px solid #f7dbf0",
                backgroundColor: "#f7dbf0",
              }}
            >
              <img
                alt="a5"
                src={a5}
                style={{
                  position: "absolute",
                  width: "50px",
                  top: "15%",
                  left: "7%",
                }}
              />

              <img
                alt="a5"
                src={a5}
                style={{
                  position: "absolute",
                  width: "50px",
                  top: "15%",
                  left: "83%",
                }}
              />
              <b style={{ fontSize: "30px" }}> ?????? ????????? ????????????????????</b>
              <div style={{ fontSize: "20px", marginTop: "2vh" }}>
                ????????????????????????
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(FirstSelect);
