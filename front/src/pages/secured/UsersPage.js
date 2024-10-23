import '../../style/global.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../commons/Request';
import TextField from '@mui/material/TextField';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import LeftMenu from '../../menus/SecuredSubLetfMenu';

const UsersPage = () => {
  const [result, setResult] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    resultUsers();
  };

  const handleUserCreation = () => {
    navigate('/secured/userCreation');
  }

  const resultUsers = (q = searchTerm) => {
    apiRequest('users', 'GET', null, {'q': q}).then((data) => {
      setResult(data);
    });
  };

  useEffect(() => {
    resultUsers();
  }, []);

  return (
    <div>
      <LeftMenu />
      <div className='margin-left-20 margin-top-5 margin-right-2'>
        <TextField
          sx={{ width: 300, marginLeft: 5, marginTop:3 }}
          label="Recherche"
          variant="outlined"
          value={searchTerm}
          onChange={handleChange}
          fullWidth
        />
        <Button 
          sx={{ width: 150, height: 40, marginLeft: 5, marginTop:3 }} 
          variant="outlined" 
          onClick={() => handleUserCreation()}
        >
          User Creation
        </Button>
        <br />
        <br />
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Prénom</strong></TableCell>
                <TableCell align="center"><strong>Nom</strong></TableCell>
                <TableCell align="center"><strong>Nom d'utilisateur</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((user, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{user.first_name}</TableCell>
                  <TableCell align="center">{user.last_name}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UsersPage;