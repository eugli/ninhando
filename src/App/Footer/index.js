import { Box } from '@mui/material';
import './index.scss';

const Footer = () => {
  return (
    <footer className="Footer">
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
          Made with <span className="Heart">❤</span> at HackGT 9
      </Box>
    </footer>
  );
}

export default Footer;