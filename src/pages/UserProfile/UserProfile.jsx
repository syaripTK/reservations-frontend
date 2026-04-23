import { useState, useEffect } from 'react';
import './UserProfile.css';
import axiosInstance from '../../utils/axiosInstance';

const getAvatarUrl = (seed, style = 'bottts') =>
  `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f0e040&backgroundType=solid`;

const AVATAR_STYLES = [
  { id: 'bottts', label: 'ROBOT' },
  { id: 'adventurer', label: 'ADVENTURER' },
  { id: 'pixel-art', label: 'PIXEL' },
  { id: 'lorelei', label: 'LORELEI' },
  { id: 'fun-emoji', label: 'EMOJI' },
];

const ROLE_META = {
  admin: { label: 'ADMINISTRATOR', color: 'red', icon: '◈' },
  user: { label: 'USER', color: 'yellow', icon: '◉' },
};

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarStyle, setAvatarStyle] = useState('bottts');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `${import.meta.env.PUBLIC_API_URL}/api/v1/auth/me`,
        );
        console.info(res);
        setProfile(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleCopyId = () => {
    if (!profile) return;
    navigator.clipboard.writeText(String(profile.id));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="up-wrapper">
        <div className="up-loading">
          <div className="up-loading-spinner" />
          <span className="up-loading-text">FETCHING_PROFILE</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="up-wrapper">
        <div className="up-error">
          <span className="up-error-code">ERR_500</span>
          <p className="up-error-msg">{error}</p>
        </div>
      </div>
    );
  }

  const roleMeta = ROLE_META[profile?.role] ?? ROLE_META.user;
  const avatarUrl = getAvatarUrl(profile?.username ?? 'user', avatarStyle);

  return (
    <div className="up-wrapper">
      <header className="up-page-header">
        <div>
          <p className="up-page-eyebrow">// USER_PROFILE</p>
          <h1 className="up-page-title">
            MY<em> PROFILE</em>
          </h1>
        </div>
      </header>

      <div className="up-content">
        <aside className="up-avatar-card">
          <div className="up-scan" />

          <div className="up-avatar-frame">
            <img
              key={avatarStyle}
              src={avatarUrl}
              alt={`Avatar ${profile?.username}`}
              className="up-avatar-img"
            />
            <span className="up-bracket up-bracket--tl" />
            <span className="up-bracket up-bracket--tr" />
            <span className="up-bracket up-bracket--bl" />
            <span className="up-bracket up-bracket--br" />
          </div>

          <div className={`up-role-badge up-role-badge--${roleMeta.color}`}>
            <span className="up-role-icon">{roleMeta.icon}</span>
            {roleMeta.label}
          </div>

          <h2 className="up-avatar-username">@{profile?.username}</h2>
          <p className="up-avatar-fullname">{profile?.full_name}</p>

          <button className="up-id-chip" onClick={handleCopyId}>
            <span className="up-id-label">UID</span>
            <span className="up-id-value">
              #{String(profile?.id).padStart(4, '0')}
            </span>
            <span className="up-id-copy">{copied ? '✓ COPIED' : 'COPY'}</span>
          </button>

          <div className="up-style-switcher">
            <p className="up-style-label">AVATAR_STYLE</p>
            <div className="up-style-grid">
              {AVATAR_STYLES.map((s) => (
                <button
                  key={s.id}
                  className={`up-style-btn ${avatarStyle === s.id ? 'up-style-btn--active' : ''}`}
                  onClick={() => setAvatarStyle(s.id)}
                  title={s.label}
                >
                  <img
                    src={getAvatarUrl(profile?.username, s.id)}
                    alt={s.label}
                    className="up-style-preview"
                  />
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="up-info-panel">
          <div className="up-section">
            <h3 className="up-section-title">IDENTITY_DATA</h3>

            <div className="up-fields">
              <div className="up-field">
                <span className="up-field-label">FULL_NAME</span>
                <div className="up-field-value-wrap">
                  <span className="up-field-value">{profile?.full_name}</span>
                </div>
              </div>

              <div className="up-field">
                <span className="up-field-label">USERNAME</span>
                <div className="up-field-value-wrap">
                  <span className="up-field-value up-field-value--mono">
                    @{profile?.username}
                  </span>
                </div>
              </div>

              <div className="up-field">
                <span className="up-field-label">USER_ID</span>
                <div className="up-field-value-wrap">
                  <span className="up-field-value up-field-value--mono up-field-value--yellow">
                    #{String(profile?.id).padStart(4, '0')}
                  </span>
                </div>
              </div>

              <div className="up-field">
                <span className="up-field-label">ROLE</span>
                <div className="up-field-value-wrap">
                  <span
                    className={`up-field-badge up-field-badge--${roleMeta.color}`}
                  >
                    {roleMeta.icon} {roleMeta.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="up-section">
            <h3 className="up-section-title">SYSTEM_INFO</h3>
            <div className="up-sys-grid">
              <div className="up-sys-item">
                <span className="up-sys-label">ACCESS_LEVEL</span>
                <span
                  className={`up-sys-value up-sys-value--${roleMeta.color}`}
                >
                  {profile?.role === 'admin'
                    ? 'FULL_ACCESS'
                    : 'STANDARD_ACCESS'}
                </span>
              </div>

              <div className="up-sys-item">
                <span className="up-sys-label">STATUS</span>
                <span className="up-sys-value up-sys-value--green">
                  <span className="up-status-dot" /> ACTIVE
                </span>
              </div>

              <div className="up-sys-item">
                <span className="up-sys-label">AUTH_METHOD</span>
                <span className="up-sys-value">JWT_BEARER</span>
              </div>

              <div className="up-sys-item">
                <span className="up-sys-label">SESSION</span>
                <span className="up-sys-value up-sys-value--green">
                  AUTHENTICATED
                </span>
              </div>
            </div>
          </div>

          <div className="up-section">
            <h3 className="up-section-title">PERMISSIONS</h3>
            <div className="up-perms">
              {getPermissions(profile?.role).map((perm) => (
                <div
                  key={perm.label}
                  className={`up-perm-item ${perm.granted ? 'up-perm-item--granted' : 'up-perm-item--denied'}`}
                >
                  <span className="up-perm-icon">
                    {perm.granted ? '✓' : '✕'}
                  </span>
                  <span className="up-perm-label">{perm.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="up-footer">
        <span className="up-footer-tag">[ASSETFLOW]</span>
        <span className="up-footer-sep">·</span>
        <span className="up-footer-tag">USER_MODULE_v2</span>
        <span className="up-footer-sep">·</span>
        <span className="up-footer-tag">ID_{profile?.id}</span>
      </footer>
    </div>
  );
};

function getPermissions(role) {
  const all = [
    { label: 'VIEW_ASSETS', admin: true, user: true },
    { label: 'CREATE_RESERVATION', admin: true, user: true },
    { label: 'VIEW_OWN_HISTORY', admin: true, user: true },
    { label: 'MANAGE_ASSETS', admin: true, user: false },
    { label: 'MANAGE_USERS', admin: true, user: false },
    { label: 'APPROVE_RESERVATION', admin: true, user: false },
    { label: 'VIEW_ALL_HISTORY', admin: true, user: false },
    { label: 'MANAGE_CATEGORIES', admin: true, user: false },
  ];
  return all.map((p) => ({
    label: p.label,
    granted: role === 'admin' ? p.admin : p.user,
  }));
}

export default UserProfile;
