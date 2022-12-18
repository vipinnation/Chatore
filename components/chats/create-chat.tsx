import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { BsPlusCircleFill } from "react-icons/bs";
import AvatarComponent from "./avatar";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
import { chat, search_user } from "../../utils/api_url";
import { getCookie } from "cookies-next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { getClientHeaders } from "../../utils/config";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface IGroupChat {
  name: string;
  members?: any;
}
interface ISnackBarOptions {
  isOpen: boolean;
  alertType: any;
  message: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type CreateChatProps = { reload: any };

const CreateChat: React.FunctionComponent<CreateChatProps> = ({ reload }) => {
  const [state, setState] = useState({
    top: false,
    left: false,
  });
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [groupChat, setGroupChat] = useState<IGroupChat>({
    name: "",
    members: [],
  });

  const [snackbarOptions, setSnackbarOptions] = useState<ISnackBarOptions>({
    isOpen: false,
    alertType: "",
    message: "",
  });

  const searchUser = async (e: any) => {
    e.preventDefault();
    setUsername(e.target.value);
    try {
      if (e.target.value.trim().length > 0) {
        let res: any = await axios.get(
          `${search_user}?search=${e.target.value.trim()}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${getCookie("auth-token")}`,
            },
          }
        );
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const createUserChat = async (user: any) => {
    try {
      if (isGroupChat == true) {
        let userMembers = groupChat.members.push(user);
        // setGroupChat({ ...groupChat, members: userMembers });
      } else {
        let res = await axios.post(
          `${chat.fetchPersonalChats}`,
          { user_id: user._id },
          { headers: getClientHeaders }
        );
        console.log(res.data);
        await reload();
        setState({ ...state, ["left"]: false });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const createGroupChat = async () => {
    if (!groupChat.name) {
      showNotifications("error", "Group name is required");
    } else {
      try {
        let res = await axios.post(`${chat.createGroupChat}`, groupChat, {
          headers: getClientHeaders,
        });
        console.log(res.data.msg)
        showNotifications("success", res.data.msg)
        await reload();
        setState({ ...state, ["left"]: false });
        setGroupChat({name:"",members: []})
      } catch (error: any) {
        showNotifications("error", error.response.data.msg)
        console.log(error);
      }
    }
  };

  const showNotifications = async (type: any, message: string) => {
    setSnackbarOptions({
      ...snackbarOptions,
      isOpen: true,
      alertType: type,
      message,
    });
    setTimeout(() => {
      setSnackbarOptions({
        ...snackbarOptions,
        isOpen: false,
        alertType: type,
        message,
      });
    }, 1500);
  };

  return (
    <div>
      <React.Fragment key={"left"}>
        <BsPlusCircleFill
          size={20}
          className="hover:text-white"
          onClick={(e) => {
            setState({ ...state, ["left"]: true });
          }}
        />
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={(e) => {
            setState({ ...state, ["left"]: false });
          }}
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
                    value={"web"}
                    exclusive
                    aria-label="Platform"
                  >
                    <ToggleButton
                      value="single_chat"
                      className="px-4"
                      onClick={(e) => {
                        setIsGroupChat(false);
                      }}
                    >
                      Single Chat
                    </ToggleButton>
                    <ToggleButton
                      value="group_chat"
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
                <div className="ml-4 w-full mt-1 mb-1">
                  <TextField
                    id="standard-basic"
                    label="Group name"
                    variant="standard"
                    required={true}
                    value={groupChat.name}
                    onChange={(e: any) => {
                      setGroupChat({ ...groupChat, name: e.target.value });
                    }}
                    helperText={"Group name is required"}
                  />
                </div>
              )}
              <div className="mx-4 mt-1">
                <TextField
                  id="standard-basic"
                  label="Username"
                  variant="standard"
                  value={username}
                  onChange={searchUser}
                />
              </div>

              {isGroupChat == true && (
                <div className="flex items-center">
                  <LoadingButton
                    loading={isLoader}
                    variant="contained"
                    className="btn btn-primary mt-2 w-2/4 ml-10"
                    type="button"
                    onClick={createGroupChat}
                    disabled={!groupChat.name.trim()}
                  >
                    Create Group
                  </LoadingButton>
                </div>
              )}

              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {users.length ? (
                  <>
                    {users.map((user: any) => {
                      return (
                        <ListItem className="hover:bg-gray-100" key={user._id}>
                          <ListItemAvatar>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <span className="capitalize">
                                {user.firstName} {user.lastName}
                              </span>
                            }
                            secondary="Jan 9, 2014"
                            onClick={(e) => {
                              createUserChat(user);
                            }}
                            className="cursor-pointer"
                          />
                        </ListItem>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </List>
            </div>

            <Snackbar
              open={snackbarOptions.isOpen}
              autoHideDuration={200}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Alert
                severity={snackbarOptions.alertType}
                sx={{ width: "100%" }}
              >
                {snackbarOptions.message}
              </Alert>
            </Snackbar>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default CreateChat;
