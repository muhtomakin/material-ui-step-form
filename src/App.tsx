import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Header from './components/Header'
import Footer from './components/Footer';
import StepForm from './components/StepForm';

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container component='main' maxWidth='sm' sx={{ mb: 4}}>
        <Paper 
          variant = 'outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}
        >
          <StepForm />
        </Paper>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
