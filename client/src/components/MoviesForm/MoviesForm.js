import React, { useState, Fragment, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import { addMovieMutation } from './mutation';
import { moviesQuery } from '../MoviesTable/queries';
import { fetchDirectorsQuery } from './queries';

const MoviesForm = props => {

  const [formError, setFormError] = useState('');
  const InputLabelRef = useRef(null);
  const { classes, open, handleChange, handleSelectChange, handleCheckboxChange, onClose, selectedValue = {} } = props;
  const { name, genre, rate, directorId, watched } = selectedValue;

  const [addMovie, { loading: mutationLoading, error: mutationError }] = useMutation(addMovieMutation, {
    onCompleted() {
      setFormError('');
      onClose();
    },
    onError(error) {
      console.log(error);
    }
  });

  const handleSave = () => {
    const { id, name, genre, rate, directorId, watched } = props.selectedValue;
    if (!name || !genre) {
      return setFormError('You should enter all required fields!')
    }
    addMovie({
      variables: {
        name,
        genre,
        rate: Number(rate),
        directorId,
        watched: Boolean(watched)
      },
      refetchQueries: [{ query: moviesQuery }]
    })
  };

  const renderButton = () => {
    if (mutationLoading) {
      return <Fragment><CircularProgress color='secondary' /> Saving...</Fragment>
    }
    return <Fragment><SaveIcon /> Save</Fragment>;
  }

  const renderError = () => {
    if (mutationError) {
      return <div className={classes.error}><span>{mutationError.message}</span></div>;
    }
    if (formError) {
      return <div className={classes.error}><span>{formError}</span></div>;
    }
    return null;
  }

  const { data } = useQuery(fetchDirectorsQuery);
  const directors = data ? data.directors : [];

  return (
    <Dialog onClose={() => { setFormError(''); onClose() }} open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle className={classes.title} id="simple-dialog-title">Movie information</DialogTitle>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name*"
          className={classes.textField}
          value={name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-genre"
          label="Genre*"
          className={classes.textField}
          value={genre}
          onChange={handleChange('genre')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-rate"
          label="Rate"
          value={rate}
          onChange={handleChange('rate')}
          type="number"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <FormControl variant="outlined" className={classes.formControlSelect}>
          <InputLabel
            // ref={ref => { this.InputLabelRef = ref; }}
            ref={ref => { InputLabelRef.current = ref; }}
            htmlFor="outlined-age-simple"
          >
            Director
            </InputLabel>
          <Select
            value={directorId}
            onChange={handleSelectChange}
            input={<OutlinedInput name="directorId" id="outlined-director" labelWidth={57} />}
          >
            {directors.map(director => <MenuItem key={director.id} value={director.id}>{director.name}</MenuItem>)}
          </Select>
        </FormControl>
        {renderError()}
        <div className={classes.wrapper}>
          <FormControlLabel
            control={<Checkbox checked={watched} onChange={handleCheckboxChange('watched')} value="watched" />}
            label="Watched movie"
          />
          <div className={classes.wrapper}>
            <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
              {renderButton()}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(MoviesForm);
