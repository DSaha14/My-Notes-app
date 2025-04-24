import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Box,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const App = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchNotes = async () => {
    const res = await fetch('https://my-notes-app-kogc.onrender.com/notes');
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (note.trim() === '') return;
    const res = await fetch('https://my-notes-app-kogc.onrender.com/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: note })
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
    setNote('');
    setSnackbarMessage('Note added successfully!');
    setSnackbarOpen(true);
  };

  const deleteNote = async (id) => {
    await fetch(`https://my-notes-app-kogc.onrender.com/notes/${id}`, { method: 'DELETE' });
    setNotes(notes.filter((n) => n.id !== id));
    setSnackbarMessage('Note deleted!');
    setSnackbarOpen(true);
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode && {
        background: {
          default: '#121212',
          paper: '#1e1e1e'
        },
        text: {
          primary: '#fff'
        }
      })
    }
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#fff';
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ py: 6, px: 4, position: 'relative', minHeight: '100vh' }}>
        <IconButton
          onClick={handleDarkModeToggle}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'text.primary',
            backgroundColor: 'background.paper',
            '&:hover': { backgroundColor: 'background.default' }
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {!darkMode && (
          <>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, #ff6b6b, #f7b731, #ff5e62)',
                backgroundSize: '400% 400%',
                animation: 'gradientBG 10s ease infinite',
                zIndex: -1,
                filter: 'blur(8px)'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '150px',
                background: 'url(/wave.svg) repeat-x',
                animation: 'wave 5s ease-in-out infinite',
                zIndex: -1
              }}
            />
          </>
        )}

        <Typography variant="h4" align="left" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}>
          📝 My Notes App
        </Typography>

        <Stack spacing={2} direction="row" sx={{ mb: 3, justifyContent: 'flex-start' }}>
          <TextField
            fullWidth
            label="New Note"
            variant="outlined"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': { borderRadius: 2 }
            }}
          />
          <Button
            variant="contained"
            onClick={addNote}
            sx={{
              backgroundColor: 'secondary.main',
              '&:hover': { backgroundColor: 'secondary.dark' },
              fontWeight: 'bold'
            }}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {notes.map((n) => (
            <Grid item xs={12} sm={6} md={4} key={n.id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '200px',
                  justifyContent: 'center',
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    boxShadow: 10,
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 'medium', color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {n.content}
                  </Typography>
                  <IconButton
                    onClick={() => deleteNote(n.id)}
                    sx={{ '&:hover': { color: 'error.main', backgroundColor: 'transparent' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default App;