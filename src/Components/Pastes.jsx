// src/Components/Pastes.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPastes } from '../redux/pasteslice';
import { useNavigate } from 'react-router-dom';
import './Pastes.css'; // Add this import

const Pastes = () => {
  const pastes = useSelector(state => state.paste?.pastes || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState([]);

  const filteredData = pastes.filter(paste =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="pastes-container">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          required
          placeholder="Search title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </form>

      {filteredData.length === 0 ? (
        <p>No pastes found.</p>
      ) : (
        filteredData.map(paste => (
          <div key={paste._id} className="paste-card">
            <div className="paste-wrapper">
              <h3 className="paste-title">{paste.title}</h3>

              <div className="paste-text-container">
                <p className={`paste-content ${expandedIds.includes(paste._id) ? 'expanded' : ''}`}>
                  {expandedIds.includes(paste._id)
                    ? paste.content
                    : paste.content.length > 100
                      ? paste.content.slice(0, 100) + '...'
                      : paste.content}
                </p>

                {paste.content.length > 100 && (
                  <button
                    onClick={() => toggleReadMore(paste._id)}
                    className="read-more-btn"
                  >
                    {expandedIds.includes(paste._id) ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>

              <div className="paste-actions">
                <button onClick={() => handleEdit(paste._id)}>Edit 📝</button>
                <button onClick={() => handleDelete(paste._id)}>Delete 🗑️</button>
                <button onClick={() => navigator.clipboard.writeText(paste.content)}>Copy 📋</button>
                <button onClick={() => alert('Share feature coming soon!')}>Share ➦</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Pastes;
