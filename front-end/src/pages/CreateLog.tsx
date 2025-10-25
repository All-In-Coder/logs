import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { createEntry, CreateDiaryEntryRequest } from '../api/api';
import './CreateLog.css';

const CreateLog: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Reference to the time input for programmatically opening the picker
  const timeInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<CreateDiaryEntryRequest>({
    date: new Date().toISOString().split('T')[0],
    time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
    mood: 'good',
    title: '',
    content: '',
    tags: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Default time handling
    let time = formData.time;
    if (!time) {
      time = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`;
    }

    // Convert to 12-hour format
    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const formattedTime = `${hour12.toString().padStart(2, '0')}:${minuteStr} ${ampm}`;

    try {
      await createEntry({ ...formData, time: formattedTime });
      navigate('/');
    } catch (error) {
      console.error('Error creating entry:', error);
      alert('Failed to create entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-log-container">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">
            <i className="far fa-book-open"></i> My Diary
          </h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main className="create-content">
        <div className="create-card">
          <h2>Add New Entry</h2>
          <form onSubmit={handleSubmit}>
            {/* Mood Selector */}
            <div className="form-group">
              <label htmlFor="mood">How are you feeling?</label>
              <div className="mood-selector">
                <input
                  type="radio"
                  id="mood-great"
                  name="mood"
                  value="great"
                  checked={formData.mood === 'great'}
                  onChange={handleChange}
                />
                <label htmlFor="mood-great" className="mood-option">
                  <i className="fas fa-smile"></i>
                  <span>Great</span>
                </label>

                <input
                  type="radio"
                  id="mood-good"
                  name="mood"
                  value="good"
                  checked={formData.mood === 'good'}
                  onChange={handleChange}
                />
                <label htmlFor="mood-good" className="mood-option">
                  <i className="fas fa-meh"></i>
                  <span>Good</span>
                </label>

                <input
                  type="radio"
                  id="mood-okay"
                  name="mood"
                  value="okay"
                  checked={formData.mood === 'okay'}
                  onChange={handleChange}
                />
                <label htmlFor="mood-okay" className="mood-option">
                  <i className="fas fa-frown"></i>
                  <span>Okay</span>
                </label>

                <input
                  type="radio"
                  id="mood-bad"
                  name="mood"
                  value="bad"
                  checked={formData.mood === 'bad'}
                  onChange={handleChange}
                />
                <label htmlFor="mood-bad" className="mood-option">
                  <i className="fas fa-sad-tear"></i>
                  <span>Bad</span>
                </label>
              </div>
            </div>

            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="What's happening?"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Content */}
            <div className="form-group">
              <label htmlFor="content">What's on your mind?</label>
              <textarea
                id="content"
                name="content"
                placeholder="Write about what's happening, your thoughts, experiences, or anything you want to remember..."
                value={formData.content}
                onChange={handleChange}
                rows={6}
                required
              />
            </div>

            {/* Time Picker */}
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                ref={timeInputRef}
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                onClick={() => timeInputRef.current?.showPicker?.()} // Opens the native time picker
                required
              />
            </div>

            {/* Tags */}
            <div className="form-group">
              <label htmlFor="tags">Tags (optional)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                placeholder="work, family, travel, etc. (separate with commas)"
                onChange={(e) => {
                  const tags = e.target.value
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag);
                  setFormData((prev) => ({ ...prev, tags }));
                }}
              />
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button type="button" onClick={() => navigate('/')} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Creating...' : 'Add Entry'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateLog;
