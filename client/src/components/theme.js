import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    color: '#fff',
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#6652ff'
    },
    secondary: blue,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    contrastText: '#fff',
  }
});
