import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPastes } from '../redux/pasteslice';
import { useNavigate } from 'react-router-dom';
import './Pastes.css';

const Pastes = () => {
  const pastes = useSelector(state => state.paste?.pastes || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (copiedId) {
      const timer = setTimeout(() => setCopiedId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedId]);

  const filteredData = pastes.filter(paste =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleReadMore = (id) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleEdit = (id) => {
    navigate(`/home?pasteId=${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this paste?")) {
      dispatch(removeFromPastes(id));
    }
  };

  const handleCopy = async (id, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="pastes-container">
      <div className="pastes-header">
        <h1 className="pastes-title">Your Pastes</h1>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="search-container">
            <svg className="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="search"
              placeholder="Search pastes..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchTerm('')}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>

      {filteredData.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm8-5h2v10h-2zm-4 7h2v3h-2zm0-4h2v2h-2z" />
          </svg>
          <p>{searchTerm ? 'No matching pastes found' : 'No pastes created yet'}</p>
          {!searchTerm && (
            <button 
              className="create-paste-button"
              onClick={() => navigate('/home')}
            >
              Create Your First Paste
            </button>
          )}
        </div>
      ) : (
        <div className="pastes-grid">
          {filteredData.map(paste => (
            <div key={paste._id} className="paste-card">
              <div className="paste-header">
                <h3 className="paste-title">{paste.title}</h3>
                <span className="paste-date">{formatDate(paste.createAt)}</span>
              </div>

              <div className="paste-content-container">
                <pre className={`paste-content ${expandedIds.includes(paste._id) ? 'expanded' : ''}`}>
                  {expandedIds.includes(paste._id)
                    ? paste.content
                    : paste.content.length > 150
                      ? paste.content.slice(0, 150) + '...'
                      : paste.content}
                </pre>

                {paste.content.length > 150 && (
                  <button
                    onClick={() => toggleReadMore(paste._id)}
                    className="read-more-btn"
                  >
                    {expandedIds.includes(paste._id) ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>

              <div className="paste-actions">
                <button 
                  onClick={() => handleEdit(paste._id)}
                  className="action-button edit-button"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                  Edit
                </button>
                <button 
                  onClick={() => handleCopy(paste._id, paste.content)}
                  className={`action-button copy-button ${copiedId === paste._id ? 'copied' : ''}`}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  {copiedId === paste._id ? 'Copied!' : 'Copy'}
                </button>
                <button 
                  onClick={() => handleDelete(paste._id)}
                  className="action-button delete-button"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pastes;
