import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function NoteForm({ addNote }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    addNote(content);
    setContent('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ my: 2 }}>
      <TextField
        label="New Note"
        variant="outlined"
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>Add Note</Button>
    </Box>
  );
}

export default NoteForm;
