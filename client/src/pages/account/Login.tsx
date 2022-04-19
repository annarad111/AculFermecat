import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@material-ui/core/Paper';
import { Link, useHistory } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../features/store/configureStore';
import { signInUser } from './accountSlice';



export default function Login() {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const {register, handleSubmit, formState:{isSubmitting, errors, isValid}} = useForm({
      mode: 'all'
    })

    async function submitForm(data: FieldValues){
      await dispatch(signInUser(data));
      history.push('/products')
      
    }

  return (
      <Container component={Paper} maxWidth="sm" 
      sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
        <CssBaseline />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              {...register('username', {required:'Introduceti un nume de utilizator!'})}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password', {required:'Introduceti o parola!'})}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to="/register">
                  {"Nu aveti deja un cont? Inregistreaza-te!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}