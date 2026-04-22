import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const IMAGE_PATH = '/error.png';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="nf-page">
      <div className="nf-grid" />

      <div className="nf-noise" />

      <div className="nf-scan" />

      <div className="nf-inner">
        <div className="nf-left">
          <div className="nf-eyebrow">
            <span className="nf-dot" />
            SYSTEM_ERROR · PAGE_NOT_FOUND
            <span className="nf-dot" />
          </div>

          <div className="nf-code-block">
            <span className="nf-code-line">
              <span className="nf-code-label">STATUS</span>
              <span className="nf-code-value nf-code-value--red">404</span>
            </span>
            <span className="nf-code-line">
              <span className="nf-code-label">MESSAGE</span>
              <span className="nf-code-value">ROUTE_NOT_FOUND</span>
            </span>
            <span className="nf-code-line">
              <span className="nf-code-label">MODULE</span>
              <span className="nf-code-value">ASSETFLOW_v2</span>
            </span>
          </div>

          <h1 className="nf-title">
            <span className="nf-title-outline">PAGE</span>
            <span className="nf-title-solid">NOT</span>
            <span className="nf-title-accent">FOUND.</span>
          </h1>

          <p className="nf-desc">
            The page you're looking for doesn't exist in our system. It may have
            been moved, deleted, or you may have mistyped the URL.
          </p>

          <div className="nf-actions">
            <button className="nf-btn-primary" onClick={() => navigate(-1)}>
              <span>← KEMBALI</span>
            </button>
            <button
              className="nf-btn-ghost"
              onClick={() => navigate('/dashboard')}
            >
              <span>KE DASHBOARD →</span>
            </button>
          </div>

          <div className="nf-footer-tag">
            <span className="nf-tag">[ASSETFLOW]</span>
            <span className="nf-tag-sep">·</span>
            <span className="nf-tag">ERROR_HANDLER_MODULE</span>
          </div>
        </div>

        <div className="nf-right">
          <div className="nf-image-slot">
            {IMAGE_PATH ? (
              <img
                src={IMAGE_PATH}
                alt="404 illustration"
                className="nf-image"
              />
            ) : (
              <div className="nf-placeholder">
                <div className="nf-placeholder-icon">⚠</div>
                <p className="nf-placeholder-text">
                  Letakkan gambar kamu di sini
                </p>
                <code className="nf-placeholder-code">
                  IMAGE_PATH = "path/to/image"
                </code>
              </div>
            )}

            <div className="nf-bracket nf-bracket--tl" />
            <div className="nf-bracket nf-bracket--tr" />
            <div className="nf-bracket nf-bracket--bl" />
            <div className="nf-bracket nf-bracket--br" />
          </div>
        </div>
      </div>

      <div className="nf-ghost-text">404</div>
    </div>
  );
}
