import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Note({ note, deleteNote }) {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{note.content}</Typography>
        <IconButton onClick={() => deleteNote(note.id)}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default Note;
