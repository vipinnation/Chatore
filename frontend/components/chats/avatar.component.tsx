import { Avatar, Badge, styled } from '@mui/material';
import React from 'react';

type Props = { name: string; className?: string; onClick?: any };

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '50%',
      height: '50%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}));

const AvatarComponent: React.FC<Props> = ({ name, className, onClick }) => {
  return (
    <>
      <span className={`flex items-center pt-3 sm:pt-0 ${className}`} onClick={onClick}>
        <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
          <Avatar src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <div className="ml-2 text-sm font-semibold capitalize">{name}</div>
      </span>
    </>
  );
};

export default AvatarComponent;
