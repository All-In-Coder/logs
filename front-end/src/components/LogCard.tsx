import React from 'react';
import { DiaryEntry } from '../api/api';
import './LogCard.css';
import { useNavigate } from 'react-router-dom';

interface LogCardProps {
  entry: DiaryEntry;
  onDelete: (id: string) => void;
}

const LogCard: React.FC<LogCardProps> = ({ entry, onDelete }) => {
  const navigate = useNavigate();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great': return 'fas fa-smile';
      case 'good': return 'fas fa-meh';
      case 'okay': return 'fas fa-frown';
      case 'bad': return 'fas fa-sad-tear';
      default: return 'fas fa-meh';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great': return '#48bb78';
      case 'good': return '#4299e1';
      case 'okay': return '#ed8936';
      case 'bad': return '#f56565';
      default: return '#4299e1';
    }
  };

  return (
    <div
      className="log-card"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/view/${entry.id}`)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/view/${entry.id}`);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <div className="log-card-header">
        <div className="log-datetime">
          <div className="log-date">
            <i className="far fa-calendar"></i>
            <span>{entry.date}</span>
          </div>
          <div className="log-time">
            <i className="far fa-clock"></i>
            <span>{entry.time}</span>
          </div>
        </div>
        <div className="log-mood" style={{ backgroundColor: getMoodColor(entry.mood) }}>
          <i className={getMoodIcon(entry.mood)}></i>
          <span>{entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onDelete(entry.id); }}
          className="delete-btn"
          title="Delete"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>

      <div className="log-content">
        <h3 className="log-title">{entry.title}</h3>
        <p className="log-content-text">{entry.content}</p>

        {entry.tags && entry.tags.length > 0 && (
          <div className="log-tags">
            {entry.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="log-footer">
        <small>Created {formatDateTime(entry.created_at)}</small>
      </div>
    </div>
  );
};

export default LogCard;
