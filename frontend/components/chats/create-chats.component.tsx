'use client';
import { ChatAPI } from '@/services/api-calls/chats.api-calls';
import { UserAPI } from '@/services/api-calls/user.api-calls';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import React, { useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import InputField from '../forms/input.component';

type Props = {
  loadNewChat: any;
};

const CreateChat: React.FC<Props> = ({ loadNewChat }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isGroupChat, setIsGroupChat] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<any>>([]);

  const searchUser = async (e: any) => {
    try {
      if (e.target.value && e.target.value.trim().length > 0) {
        let data = await UserAPI.searchUser(e.target.value.trim());
        setUsers((_prev) => data);
      } else {
        setUsers((_prev) => []);
      }
    } catch (error) {}
  };

  const proceesUserEvent = async (user: any) => {
    try {
      if (isGroupChat == false) {
        // start personal chat
        let res = await ChatAPI.fetchPersonalChat(user);
        setIsOpen((_prev) => false);
        loadNewChat(res);
        console.log(res);
      } else {
        // add person to group
      }
    } catch (error) {}
  };

  return (
    <div>
      <BsPlusCircleFill
        size={20}
        className="hover:text-white"
        onClick={(e) => {
          setIsOpen((_prev) => true);
        }}
      />

      <Drawer
        anchor={'left'}
        open={isOpen}
        onClose={(e) => {
          setIsOpen(false);
        }}
      >
        <Box sx={{ width: 300 }} role="presentation">
          <div className="">
            <div className="flex items-center justify-center bg-gray-100 shadow-xl py-3">Start a chat</div>
          </div>
          <>
            <div className="pt-4 mx-4">
              <ToggleButtonGroup color="primary" value={'web'} exclusive aria-label="Platform">
                <ToggleButton
                  value="single_chat"
                  className="px-4"
                  onClick={(e) => {
                    setIsGroupChat((_prev) => false);
                  }}
                >
                  Single Chat
                </ToggleButton>
                <ToggleButton
                  value="group_chat"
                  className="px-4"
                  onClick={(e) => {
                    setIsGroupChat((_prev) => true);
                  }}
                >
                  Group Chat
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </>

          {isGroupChat == true ? (
            <div className="ml-4 w-full mt-1 mb-1">
              <TextField
                id="standard-basic"
                label="Group name"
                variant="standard"
                required={true}
                helperText={'Group name is required'}
              />
            </div>
          ) : null}

          <div className="mx-4 mt-1">
            <InputField label="Username" name="username" type="text" onChange={searchUser} />
          </div>

          {isGroupChat == true ? (
            <div className="flex items-center">
              <LoadingButton
                loading={false}
                variant="contained"
                className="btn bg-primary mt-2 w-2/4 ml-10"
                type="button"
              >
                Create Group
              </LoadingButton>
            </div>
          ) : null}

          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper'
            }}
          >
            {users.length ? (
              <>
                {users.map((user: any) => {
                  return (
                    <ListItem className="hover:bg-gray-100" key={user._id} onClick={(e) => proceesUserEvent(user)}>
                      <ListItemAvatar>
                        <Avatar>
                          <FaUser />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<span className="capitalize">{user.full_name}</span>}
                        secondary="Jan 9, 2014"
                        className="cursor-pointer"
                      />
                    </ListItem>
                  );
                })}
              </>
            ) : null}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default CreateChat;
