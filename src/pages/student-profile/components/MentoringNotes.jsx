import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/input';

const MentoringNotes = ({ notes, onAddNote, userRole, studentName }) => {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote?.trim()) {
      const note = {
        id: Date.now(),
        mentorName: "Current Mentor",
        content: newNote?.trim(),
        timestamp: new Date(),
        type: 'intervention'
      };
      onAddNote(note);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'intervention':
        return 'MessageSquare';
      case 'progress':
        return 'TrendingUp';
      case 'concern':
        return 'AlertTriangle';
      default:
        return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'intervention':
        return 'bg-blue-100 text-blue-800';
      case 'progress':
        return 'bg-green-100 text-green-800';
      case 'concern':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} color="#8b5cf6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Mentoring Notes</h3>
            <p className="text-sm text-gray-600">
              {userRole === 'mentor' ? 'Track interventions and progress' : 'View mentoring history and feedback'}
            </p>
          </div>
        </div>
        {userRole === 'mentor' && (
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setIsAddingNote(true)}
            disabled={isAddingNote}
          >
            Add Note
          </Button>
        )}
      </div>
      {isAddingNote && userRole === 'mentor' && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Add New Mentoring Note</h4>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder={`Add a note for ${studentName}...`}
              value={newNote}
              onChange={(e) => setNewNote(e?.target?.value)}
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                onClick={handleAddNote}
                disabled={!newNote?.trim()}
              >
                Save Note
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {notes?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No mentoring notes yet</p>
            {userRole === 'mentor' && (
              <p className="text-sm text-gray-400 mt-1">Add your first note to start tracking progress</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {notes?.map((note) => (
              <div key={note?.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{note?.mentorName}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(note?.type)}`}>
                          <Icon name={getTypeIcon(note?.type)} size={12} className="mr-1" />
                          {note?.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(note?.timestamp)}</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{note?.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {notes?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>Total Notes: {notes?.length}</p>
            <p>Last Updated: {formatDate(notes?.[0]?.timestamp || new Date())}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentoringNotes;