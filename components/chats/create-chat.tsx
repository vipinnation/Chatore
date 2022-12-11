import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { BsPlusCircleFill } from "react-icons/bs";
import List from "@mui/material/List";
import AvatarComponent from "./avatar";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const CreateChat = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
  });
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <div>
      <React.Fragment key={"left"}>
        <BsPlusCircleFill
          size={20}
          className="hover:text-white"
          onClick={toggleDrawer("left", true)}
        />
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <Box sx={{ width: 300 }} role="presentation">
            <div className="">
              <div className="flex items-center justify-center bg-gray-100 shadow-xl py-3">
                Start a chat
              </div>
              <>
                <div className="pt-4 mx-4">
                  <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                  >
                    <ToggleButton
                      value="web"
                      className="px-4"
                      onClick={(e) => {
                        setIsGroupChat(false);
                      }}
                    >
                      Single Chat
                    </ToggleButton>
                    <ToggleButton
                      value="android"
                      className="px-4"
                      onClick={(e) => {
                        setIsGroupChat(true);
                      }}
                    >
                      Group Chat
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </>

              {isGroupChat == true && (
                <div className="ml-4 w-full mt-1">
                  <TextField
                    id="standard-basic"
                    label="Group name"
                    variant="standard"
                  />
                </div>
              )}
              <div className="mx-4 mt-1">
                <TextField
                  id="standard-basic"
                  label="Username"
                  variant="standard"
                />
              </div>

              {isGroupChat == true && (
                <div className="flex items-center">
                  <LoadingButton
                    loading={isLoader}
                    variant="contained"
                    className="btn btn-primary mt-2 w-2/4 ml-10"
                    type="submit"
                  >
                    Create Group
                  </LoadingButton>
                </div>
              )}
            </div>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default CreateChat;
