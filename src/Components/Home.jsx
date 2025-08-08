import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteslice.js';
import { ThemeContext } from '../context/ThemeContext';
import './Home.css';

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const searchParams = useSearchParams()[0];
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const contentRef = useRef(null);

  useEffect(() => {
    if (pasteId && contentRef.current) {
      // Load existing paste logic here if needed
    }
  }, [pasteId]);

  const handleContentChange = () => {
    const text = contentRef.current.innerText;
    setContent(text);
    setCharCount(text.length);
  };

  const createPaste = () => {
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    if (title.length > 100) {
      setError("Title cannot be more than 100 characters.");
      return;
    }
    if (content.length > 10000) {
      setError("Content cannot exceed 10,000 characters.");
      return;
    }

    const paste = {
      title: title.trim(),
      content: content.trim(),
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setContent('');
    setError('');
    setCharCount(0);
    if (contentRef.current) contentRef.current.innerText = '';
  };

  return (
    <div className="home-container" data-theme={theme}>
      <div className="paste-card">
        <h1 className="paste-title">{pasteId ? "Edit Your Paste" : "Create New Paste"}</h1>
        
        {error && (
          <div className="error-message">
            <svg className="error-icon" viewBox="0 0 20 20">
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
            </svg>
            {error}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="paste-title-input">Title</label>
          <input
            id="paste-title-input"
            type="text"
            placeholder="My Awesome Paste"
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />
          <div className="char-counter">{title.length}/100</div>
        </div>

        <div className="input-group">
          <label>Content</label>
          <div
            className={`content-editor ${isFocused ? 'focused' : ''}`}
            contentEditable
            ref={contentRef}
            onInput={handleContentChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Write your content here..."
            spellCheck={true}
            role="textbox"
            aria-multiline="true"
            suppressContentEditableWarning={true}
          ></div>
          <div className="char-counter">{charCount}/10,000</div>
        </div>

        <div className="button-group">
          <button onClick={createPaste} className="submit-button">
            {pasteId ? "Update Paste" : "Create Paste"}
            <svg className="button-icon" viewBox="0 0 24 24">
              <path d={pasteId ? "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" : "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
