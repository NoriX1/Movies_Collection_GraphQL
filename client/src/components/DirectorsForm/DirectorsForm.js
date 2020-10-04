import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import { addDirectorMutation, updateDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

const DirectorsForm = props => {
  const [formError, setFormError] = useState('');
  const { classes, open, onClose, handleChange, selectedValue = {} } = props;
  const { name, age } = selectedValue;

  const [addDirector, { loading: addDirectorLoading, }] = useMutation(addDirectorMutation, {
    onCompleted() {
      setFormError('');
      onClose();
    },
    onError(error) {
      setFormError(error.message);
    },
  });

  const [updateDirector, { loading: updateDirectorLoading }] = useMutation(updateDirectorMutation, {
    onCompleted() {
      setFormError('');
      onClose();
    },
    onError(error) {
      setFormError(error.message);
    },
  });

  const handleSave = () => {
    const { id, name, age } = props.selectedValue;
    if (!name) {
      return setFormError('Name cannot be empty string!');
    }
    if (age <= 0 || age >= 125) {
      return setFormError('You must enter a valid age');
    }
    if (id) {
      updateDirector({
        variables: { id, name, age: Number(age) },
        refetchQueries: [{ query: directorsQuery, variables: { name: '' } }]
      })
    } else {
      addDirector({
        variables: { name, age: Number(age) },
        refetchQueries: [{ query: directorsQuery, variables: { name: '' } }]
      });
    }
  };

  const renderButton = () => {
    if (addDirectorLoading || updateDirectorLoading) {
      return <Fragment><CircularProgress color='secondary' /> Saving...</Fragment>
    }
    return <Fragment><SaveIcon /> Save</Fragment>;
  }

  const renderError = () => {
    if (formError) {
      return <div className={classes.error}><span>{formError}</span></div>;
    }
    return null;
  }

  return (
    <Dialog onClose={() => { setFormError(''); onClose() }} open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle className={classes.title} id="simple-dialog-title">Director information</DialogTitle>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={name || ''}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-rate"
          label="Age"
          className={classes.textField}
          value={age || ''}
          onChange={handleChange('age')}
          type="number"
          margin="normal"
          variant="outlined"
        />
        {renderError()}
        <div className={classes.wrapper}>
          <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
            {renderButton()}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(DirectorsForm);
