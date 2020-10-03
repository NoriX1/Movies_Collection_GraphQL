import React from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import { addDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

const DirectorsForm = props => {

  const [saveDirector] = useMutation(addDirectorMutation);
  const { classes, open, handleChange, selectedValue = {} } = props;
  const { name, age } = selectedValue;

  const handleSave = () => {
    const { selectedValue, onClose } = props;
    const { id, name, age } = selectedValue;
    saveDirector({
      variables: { name, age: Number(age) },
      refetchQueries: [{ query: directorsQuery }]
    });
    onClose();
  };

  return (
    <Dialog onClose={() => { props.onClose() }} open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle className={classes.title} id="simple-dialog-title">Director information</DialogTitle>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-rate"
          label="Age"
          className={classes.textField}
          value={age}
          onChange={handleChange('age')}
          type="number"
          margin="normal"
          variant="outlined"
        />
        <div className={classes.wrapper}>
          <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
            <SaveIcon /> Save
            </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(DirectorsForm);
