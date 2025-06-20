import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteslice.js';

const Home = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const contentRef = useRef(null);

  useEffect(() => {
    if (pasteId && contentRef.current) {
      // Load existing paste logic here if needed
    }
  }, [pasteId]);

  const handleContentChange = () => {
    setContent(contentRef.current.innerText);
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
    setSearchParams({});
    if (contentRef.current) contentRef.current.innerText = '';
  };

    return (
    <div className="home-container">
      {error && <p className="error-msg">{error}</p>}

      <input
        type="text"
        placeholder="Enter Title.."
        value={title}
        maxLength={40}
        onChange={(e) => setTitle(e.target.value)}
        className="input-custom"
      />

      <div
        className="content-div"
        contentEditable
        ref={contentRef}
        onInput={handleContentChange}
        placeholder="Enter Content..."
        spellCheck={true}
        role="textbox"
        aria-multiline="true"
        suppressContentEditableWarning={true}
      ></div>

      <button onClick={createPaste} className="submit-btn">
        {pasteId ? "Update My Paste" : "Create My Paste"}
      </button>
    </div>
  );

};

export default Home;
