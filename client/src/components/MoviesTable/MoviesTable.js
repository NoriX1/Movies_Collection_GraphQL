import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoviesSearch from '../MoviesSearch/MoviesSearch';

import MoviesDialog from '../MoviesDialog/MoviesDialog';
import { moviesQuery } from './queries';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

const MoviesTable = props => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchString, setSearchString] = useState('');

  const handleClick = ({ currentTarget }, data) => {
    setAnchorEl(currentTarget);
    setSelectedMovie(data);
  };

  const handleEdit = () => {
    props.onOpen(selectedMovie);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    if (e.charCode === 13) {
      refetch({ name: searchString });
    }
  };

  const { loading, error, data, refetch } = useQuery(moviesQuery, { variables: { name: '' } });

  if (loading) {
    return (
      <div className={props.classes.loader}>
        <CircularProgress />
      </div>
    );
  }

  if (error) console.log(error);

  const { movies = [] } = data;

  return (
    <Fragment>
      <Paper>
        <MoviesSearch
          name={searchString}
          handleChange={() => e => setSearchString(e.target.value)}
          handleSearch={handleSearch}
        />
      </Paper>
      <MoviesDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        id={selectedMovie.id || ''}
      />
      <Paper className={props.classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Watched</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map(movie => {
              return (
                <TableRow key={movie.id}>
                  <TableCell component="th" scope="row">{movie.name}</TableCell>
                  <TableCell>{movie.genre}</TableCell>
                  <TableCell align="right">{movie.rate}</TableCell>
                  <TableCell>{movie.director.name}</TableCell>
                  <TableCell>
                    <Checkbox checked={movie.watched} disabled />
                  </TableCell>
                  <TableCell align="right">
                    <Fragment>
                      <IconButton color="inherit" onClick={(e) => handleClick(e, movie)}>
                        <MoreIcon />
                      </IconButton>
                      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} >
                        <MenuItem onClick={handleEdit}><CreateIcon /> Edit</MenuItem>
                        <MenuItem onClick={handleDelete}><DeleteIcon /> Delete</MenuItem>
                      </Menu>
                    </Fragment>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  );
};

export default withStyles(styles)(MoviesTable);
