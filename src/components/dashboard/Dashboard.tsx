import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, LogOut, Pin, Moon, Sun, X } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';

interface Note {
  _id: string;
  title: string;
  content: string;
  tags?: string[];
  isPinned: boolean;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    isPinned: false
  });
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.NOTES, {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const {data} = await response.json();
        setNotes(data.notes || []);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch notes',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Network error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch(API_ENDPOINTS.CREATE_NOTE, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        // title, content, tags, isPinned
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
          tags: newNote.tags,
          isPinned: newNote.isPinned,
        }),
      });

      if (response.ok) {
        const {data} = await response.json();
        setNotes(prev => [data.note, ...prev]);
        setNewNote({ title: '', content: '', tags: [], isPinned: false });
        setTagInput('');
        toast({
          title: 'Success',
          description: 'Note created successfully',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to create note',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Network error. Please try again.',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const togglePin = async (noteId: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.PIN_NOTE(noteId), {
        method: 'PATCH',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setNotes(prev => prev.map(note => 
          note._id === noteId 
            ? { ...note, isPinned: !note.isPinned }
            : note
        ));
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to toggle pin',
      });
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const deleteNote = async (noteId: string) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(API_ENDPOINTS.DELETE_NOTE(noteId), {
        method: 'DELETE',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setNotes(prev => prev.filter(note => note._id !== noteId));
        toast({
          title: 'Success',
          description: 'Note deleted successfully',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete note',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Network error. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar with Sign Out and Theme Toggle */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-muted-foreground hover:text-foreground"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className=" p-4 text-start my-9">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mb-1">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>

        {/* Create Note Section */}
        <Card className="mb-8 shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              Create New Note
            </CardTitle>
            <CardDescription>
              Jot down your thoughts, ideas, or reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter note title..."
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="What's on your mind?"
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-[120px] resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline" size="sm">
                  Add
                </Button>
              </div>
              {newNote.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newNote.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPinned"
                checked={newNote.isPinned}
                onChange={(e) => setNewNote(prev => ({ ...prev, isPinned: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isPinned" className="flex items-center gap-2">
                <Pin className="h-4 w-4" />
                Pin this note
              </Label>
            </div>
            <Button 
              onClick={createNote} 
              disabled={!newNote.title.trim() || !newNote.content.trim() || isCreating}
              className="w-full"
            >
              {isCreating ? 'Creating...' : 'Create Note'}
            </Button>
          </CardContent>
        </Card>

        {/* Notes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            <span className="text-sm text-muted-foreground">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-4 md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-3 md:space-y-0">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-16 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : notes.length === 0 ? (
            <Card className="text-center py-12 shadow-soft border-0">
              <CardContent>
                <div className="text-muted-foreground">
                  <PlusCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No notes yet</p>
                  <p className="text-sm">Create your first note to get started!</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Mobile: List format */}
              <div className="space-y-4 md:hidden">
                {sortedNotes && sortedNotes.map((note) => (
                  <Card key={note._id} className={`shadow-soft border-0 hover:shadow-medium transition-shadow ${note.isPinned ? 'bg-primary' : ' ring-1 '}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {note.isPinned && <Pin className="h-4 w-4 text-primary-foreground" />}
                          <h3 className="font-medium text-foreground">
                            {note.title}
                          </h3>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePin(note._id)}
                            className={`h-6 w-6 p-0 ${note.isPinned ? 'text-black' : 'text-muted-foreground'}`}
                          >
                            <Pin className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNote(note._id)}
                            className="text-red-900 hover:text-destructive h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className={`text-sm ${note.isPinned ? ' text-primary-foreground' : 'text-primary'} mb-3`}>
                        {note.content}
                      </p>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {note.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className={`"text-xs ${note.isPinned ? ' text-primary-foreground' : ''}`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-white">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop: Card format */}
              <div className="hidden md:grid gap-4 grid-cols-2 lg:grid-cols-3">
                {sortedNotes.map((note) => (
                  <Card key={note._id} className={`shadow-soft border-0 hover:shadow-medium transition-shadow ${note.isPinned ? 'bg-primary' : 'ring-1 ring-primary/20'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {note.isPinned && <Pin className="h-4 w-4 text-primary-foreground" />}
                          <h3 className="font-medium text-sm text-foreground line-clamp-1">
                            {note.title}
                          </h3>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePin(note._id)}
                            className={`h-6 w-6 p-0 ${note.isPinned ? 'text-black' : 'text-muted-foreground'}`}
                          >
                            <Pin className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNote(note._id)}
                            className="text-muted-foreground text-red-900 hover:text-destructive h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className={`text-sm text-muted-foreground line-clamp-3 ${note.isPinned ? ' text-primary-foreground' : 'text-primary'} mb-3`}>
                        {note.content}
                      </p>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {note.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className={`text-xs ${note.isPinned ? 'bg-black text-white' : ''} `}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className={`text-xs ${note.isPinned ? ' text-primary-foreground' : ''}`}>
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;