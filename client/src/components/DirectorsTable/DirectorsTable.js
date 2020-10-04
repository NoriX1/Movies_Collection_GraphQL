import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CircularProgress from '@material-ui/core/CircularProgress';

import DirectorsDialog from '../DirectorsDialog/DirectorsDialog';
import { directorsQuery } from './queries';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

const DirectorsTable = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState({});

  const handleClick = ({ currentTarget }, data) => {
    setAnchorEl(currentTarget);
    setSelectedDirector(data);
  };

  const handleEdit = () => {
    props.onOpen(selectedDirector);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const { loading, error, data } = useQuery(directorsQuery);

  if (loading) {
    return (
      <div className={props.classes.loader}>
        <CircularProgress />
      </div>
    );
  }

  if (error) console.log(error);

  const { directors = [] } = data;

  return (
    <Fragment>
      <DirectorsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        id={selectedDirector.id ? selectedDirector.id : null}
      />
      <Paper className={props.classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell>Movies</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {directors.map(director => {
              return (
                <TableRow key={director.id}>
                  <TableCell component="th" scope="row">{director.name}</TableCell>
                  <TableCell align="right">{director.age}</TableCell>
                  <TableCell>
                    {director.movies.map((movie, key) => <div key={movie.name}>{`${key + 1}. `}{movie.name}</div>)}
                  </TableCell>
                  <TableCell align="right">
                    <Fragment>
                      <IconButton color="inherit" onClick={(e) => handleClick(e, director)}>
                        <MoreIcon />
                      </IconButton>
                      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} >
                        <MenuItem onClick={() => handleEdit(director)}><CreateIcon /> Edit</MenuItem>
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

export default withStyles(styles)(DirectorsTable);
