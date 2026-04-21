import React from 'react';

const UserAvatar = ({ name, role, size = 40 }) => {
  const style = role === 'admin' ? 'initials' : 'lorelei';
  const seed = encodeURIComponent(name || 'guest');
  const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede&radius=50`;

  return (
    <img
      src={avatarUrl}
      alt={`${name}'s avatar`}
      style={{ width: size, height: size }}
      className="rounded-full border-2 border-white shadow-sm bg-slate-100"
      loading="lazy"
    />
  );
};

export default UserAvatar;
