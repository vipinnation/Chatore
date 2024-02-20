'use client';
import { ChatAPI } from '@/services/api-calls/chats.api-calls';
import { GroupAPI } from '@/services/api-calls/group.api-calls';
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
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import React, { useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { useSnackbar } from '../alert/alert.context';
import InputField from '../forms/input.component';

type Props = {
  loadNewChat: any;
};

const CreateChat: React.FC<Props> = ({ loadNewChat }) => {
  const { toastMessage } = useSnackbar();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isGroupChat, setIsGroupChat] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<any>>([]);
  const [groupUser, setGroupUser] = useState<Array<any>>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchUser = async (e: any) => {
    try {
      if (e.target.value && e.target.value.trim().length > 0) {
        let data = await UserAPI.searchUser(e.target.value.trim());
        if (isGroupChat == true) {
          const filteredUsers = data.filter((user) => !groupUser.includes(user._id));
          setUsers((_prev) => filteredUsers);
        } else {
          setUsers((_prev) => data);
        }
      } else {
        setUsers((_prev) => []);
      }
    } catch (error) {}
  };

  const proceesUserEvent = async (user: any) => {
    try {
      if (isGroupChat == false) {
        let res = await ChatAPI.fetchPersonalChat(user);
        setIsOpen((_prev) => false);
        loadNewChat(res);
        setUsers((_prev) => []);
      } else {
        setIsUserLoading((_prev) => true);
        let isUserPresent = groupUser.includes(user._id);
        if (!isUserPresent) {
          let otherUsers = await users.filter((user) => ![...groupUser, ...[user._id]].includes(user._id));
          setGroupUser((_prev) => [..._prev, ...[user._id]]);
          if (otherUsers.length > 0) await setUsers((_prev) => otherUsers);
        } else {
          let otherUsers = await users.filter((user) => !groupUser.includes(user._id));
          await setUsers((_prev) => otherUsers);
        }
        setIsUserLoading((_prev) => false);
      }
    } catch (error) {
      setIsUserLoading((_prev) => false);
    }
  };

  const createGroupHandle = async () => {
    try {
      if (!groupName || (groupName && groupName.trim().length == 0))
        return toastMessage('Group Name is required ', 'error');
      setIsLoading((_prev) => true);
      let res = await GroupAPI.createGroup(groupName, groupUser);
      toastMessage(res.msg, 'success');
      loadNewChat(res.group, true);
      setIsOpen((_prev) => false);
      setUsers((_prev) => []);
      setGroupName('');
      setGroupUser([]);
      setIsLoading((_prev) => false);
    } catch (error) {
      setIsLoading((_prev) => false);
      toastMessage(error, 'error');
    }
  };
  return (
    <div>
      <BsPlusCircleFill
        size={20}
        className="hover:text-white"
        onClick={() => {
          setIsOpen((_prev) => true);
        }}
      />

      <Drawer
        anchor={'left'}
        open={isOpen}
        onClose={() => {
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
                  onClick={() => {
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
            <div className="mx-4 my-1">
              <InputField
                label="Group Name"
                name="group-name"
                type="text"
                onChange={(e: any) => {
                  setGroupName(e.target.value);
                }}
              />
            </div>
          ) : null}

          <div className="mx-4 mt-1">
            <InputField label="Username" name="username" type="text" onChange={searchUser} />
          </div>

          {isGroupChat == true ? (
            <div className="flex items-center">
              <LoadingButton
                loading={isLoading}
                variant="contained"
                className="btn bg-primary mt-2 w-2/4 ml-10"
                type="button"
                onClick={createGroupHandle}
              >
                Create Group
              </LoadingButton>
            </div>
          ) : null}

          {isUserLoading == false ? (
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
                      <ListItem
                        className="hover:bg-gray-100"
                        key={Math.floor(Math.random() * 1e4)}
                        onClick={(e) => proceesUserEvent(user)}
                      >
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
          ) : null}
        </Box>
      </Drawer>
    </div>
  );
};

export default CreateChat;
