import React, { useState } from 'react';
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

  const filteredPastes = pastes.filter(paste =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.createAt) - new Date(a.createAt));

  const toggleReadMore = (id) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCopy = async (id, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="pastes-container">
      <div className="search-container">
        <input
          type="search"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search pastes"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="clear-search"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {filteredPastes.length === 0 ? (
        <div className="empty-state">
          {searchTerm ? 'No matching pastes found' : 'No pastes created yet'}
        </div>
      ) : (
        <div className="pastes-grid">
          {filteredPastes.map(paste => (
            <div key={paste._id} className="paste-card">
              <h3 className="paste-title">{paste.title}</h3>
              <div className="paste-meta">
                {new Date(paste.createAt).toLocaleString()}
              </div>
              
              <div className="paste-content-container">
                <pre className={`paste-content ${expandedIds.includes(paste._id) ? 'expanded' : ''}`}>
                  {expandedIds.includes(paste._id)
                    ? paste.content
                    : paste.content.length > 150
                      ? `${paste.content.slice(0, 150)}...`
                      : paste.content}
                </pre>

                {paste.content.length > 150 && (
                  <button
                    onClick={() => toggleReadMore(paste._id)}
                    className="read-more-btn"
                    aria-expanded={expandedIds.includes(paste._id)}
                  >
                    {expandedIds.includes(paste._id) ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>

              <div className="paste-actions">
                <button 
                  onClick={() => navigate(`/home?pasteId=${paste._id}`)}
                  className="action-btn edit-btn"
                  aria-label={`Edit ${paste.title}`}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleCopy(paste._id, paste.content)}
                  className={`action-btn copy-btn ${copiedId === paste._id ? 'copied' : ''}`}
                  aria-label={`Copy ${paste.title}`}
                >
                  {copiedId === paste._id ? 'Copied!' : 'Copy'}
                </button>
                <button 
                  onClick={() => dispatch(removeFromPastes(paste._id))}
                  className="action-btn delete-btn"
                  aria-label={`Delete ${paste.title}`}
                >
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
