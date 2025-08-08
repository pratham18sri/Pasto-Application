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

  const filteredData = pastes.filter(paste =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleReadMore = (id) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="clear-search"
          >
            ×
          </button>
        )}
      </div>

      {filteredData.length === 0 ? (
        <div className="empty-state">
          {searchTerm ? 'No matching pastes found' : 'No pastes created yet'}
        </div>
      ) : (
        <div className="pastes-grid">
          {filteredData.map(paste => (
            <div key={paste._id} className="paste-card">
              <h3 className="paste-title">{paste.title}</h3>
              
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
                  onClick={() => navigate(`/home?pasteId=${paste._id}`)}
                  className="action-btn edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleCopy(paste._id, paste.content)}
                  className={`action-btn copy-btn ${copiedId === paste._id ? 'copied' : ''}`}
                >
                  {copiedId === paste._id ? 'Copied!' : 'Copy'}
                </button>
                <button 
                  onClick={() => dispatch(removeFromPastes(paste._id))}
                  className="action-btn delete-btn"
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
