import '../../../style/global.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../commons/Request';
import TextField from '@mui/material/TextField';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DefaultDataTable from '../../defaultDataTable';
import LanguageEnum from '../../../enums/LanguageEnum';

const UsersPage = () => {
  const [result, setResult] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('first_name');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleUserCreation = () => {
    navigate('/secured/userCreation');
  }

  const handleViewCreation = (dict) => {
    navigate('/secured/profile', {state: {userData: dict}});
  }

  const handleUserModification = (dict) => {
    navigate('/secured/userModification', {state: {userData: dict}});
  }

  const resultUsers = (q = searchTerm, sort_by = 'first_name', order = 'asc') => {
    return apiRequest('users', 'GET', null, {'q': q, 'sort_by': sort_by, 'order': order}).then((data) => {
      setResult(data);
    });
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    resultUsers();
  };

  const handleSort = (column) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortBy(column);
    resultUsers(searchTerm, column, newOrder);
  };


  useEffect(() => {
    resultUsers();
  }, []);

  return (
    <DefaultDataTable>
      <TextField
        sx={{ width: 300, marginLeft: 5, marginTop:3 }}
        label={t('basic.Research')}
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        fullWidth
      />
      <Button 
        sx={{ width: 150, height: 40, marginLeft: 5, marginTop:4 }} 
        variant="outlined" 
        onClick={() => handleUserCreation()}
      >
        {t('user.userCreation')}
      </Button>
      <br />
      <br />
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" onClick={() => handleSort('first_name')} style={{ cursor: 'pointer' }}> 
                <strong>{t('user.firstName')}</strong>{' '}
                  {sortBy === 'first_name' && (sortOrder === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell align="center" onClick={() => handleSort('last_name')} style={{ cursor: 'pointer' }}>
                <strong>{t('user.lastName')}</strong>{' '}
                  {sortBy === 'last_name' && (sortOrder === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell align="center" onClick={() => handleSort('username')} style={{ cursor: 'pointer' }}>
                <strong>{t('user.Username')}</strong>{' '}
                  {sortBy === 'username' && (sortOrder === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell align="center"><strong>{t('user.email')}</strong></TableCell>
              <TableCell align="center"><strong>{t('user.Language')}</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result && result.map((user, index) => (
              <TableRow key={index}>
                <TableCell align="center">{user.firstName}</TableCell>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{t(`${LanguageEnum[user.languageCode].translation}`)}</TableCell>
                <TableCell align="center">
                  <Button 
                    sx={{ width: 150, height: 40 }} 
                    variant="outlined" 
                    onClick={() => {
                      let dict = {                        
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email,
                        languageCode: user.languageCode,
                        userId: user.userId}
                      handleUserModification(dict);
                    }}
                  >
                    {t('basic.Edit')}
                  </Button>

                  <Button 
                    sx={{ marginLeft:1, width: 150, height: 40 }} 
                    variant="outlined" 
                    onClick={() => {
                      let dict = {                        
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email,
                        languageCode: user.languageCode,
                        userId: user.userId}
                        handleViewCreation(dict);
                    }}
                  >
                    {t('basic.View')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DefaultDataTable>
  );
};

export default UsersPage;