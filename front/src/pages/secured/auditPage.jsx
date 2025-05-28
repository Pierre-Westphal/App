import React from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { apiRequest } from '../../commons/Request';
import DefaultDataTable from '../defaultDataTable';
import { useTranslation } from 'react-i18next';
import InformationModal from '../../helpers/InformationModal';
import CustomDatePicker from '../../commons/DatePicker';


const AuditPage = () => {
    const [auditData, setAuditData] = React.useState([]);
    const [auditDataDetails, setAuditDataDetails] = React.useState({});
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortBy, setSortBy] = React.useState('timestamp');
    const [sortOrder, setSortOrder] = React.useState('desc');
    const [showInformationModal, setShowInformationModal] = React.useState(false);
    const { t } = useTranslation();
    
    
    const fetchAuditData = (q = searchTerm, sort_by = 'timestamp', order = 'desc') => {
        apiRequest('audits', 'GET', null, {'q': q, 'sort_by': sort_by, 'order': order}).then((data) => {
        setAuditData(data);
        });
    };

    const handleSort = (column) => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        setSortBy(column);
        fetchAuditData(searchTerm, column, newOrder);
    };


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        fetchAuditData();
    }

    const handleCloseInformationModal = () => {
        setShowInformationModal(false)
        // Implement the logic to view audit details
    };

    const handleOpenInformationModal = (audit) => {
        let parsedDetails = audit.details;
        try {
            if (typeof audit.details === 'string' && audit.details.startsWith("b'")) {
            const cleaned = audit.details.slice(2, -1);
            parsedDetails = JSON.parse(cleaned);
            }
        } catch (e) {
            parsedDetails = audit.details;
        }
        const auditDetails = {
            username: audit.username,
            method: audit.method,
            path: audit.path,
            timestamp: new Date(audit.timestamp).toLocaleString(),
            details: parsedDetails
        }
        setAuditDataDetails(auditDetails);
    };

    React.useEffect(() => {
    if (auditDataDetails && Object.keys(auditDataDetails).length > 0) {
        setShowInformationModal(true);
    }
    }, [auditDataDetails]);
    
    React.useEffect(() => {
        const fetchAuditData = () => {
            apiRequest('audits', 'GET').then((data) => {
                setAuditData(data);
            });
        };
        fetchAuditData();
    }, []);
    
    return (
        <DefaultDataTable>
            <InformationModal
                open={showInformationModal}
                handleClose={handleCloseInformationModal}
                message={auditDataDetails}
            />
            <h1 className='text-green-800 text-4xl'>{t(`audit.title`)}</h1>
            <TextField
                sx={{ width: 300, marginLeft: 5, marginTop:3 }}
                label={t('basic.Research')}
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
                fullWidth
            />
            {/* <CustomDatePicker
                sx={{ width: 300, marginLeft: 5, marginTop:3 }}
                label={t('audit.auditForm.date')}
                value={null} 
                onChange={(date) => {
                    console.log(date);
                }}
                fullWidth
            /> */}
            <br />
            <br />
            <br />
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" onClick={() => handleSort('username')} style={{ cursor: 'pointer' }}>
                                <strong>{t('audit.auditForm.username')}</strong>{' '}
                                {sortBy === 'username' && (sortOrder === 'asc' ? '🔼' : '🔽')}
                            </TableCell>
                            <TableCell align="center" onClick={() => handleSort('method')} style={{ cursor: 'pointer' }}>
                                <strong>{t('audit.auditForm.method')}</strong>{' '}
                                {sortBy === 'method' && (sortOrder === 'asc' ? '🔼' : '🔽')}
                            </TableCell>
                            <TableCell align="center" onClick={() => handleSort('path')} style={{ cursor: 'pointer' }}>
                                <strong>{t('audit.auditForm.path')}</strong>{' '}
                                {sortBy === 'path' && (sortOrder === 'asc' ? '🔼' : '🔽')}
                            </TableCell>
                            <TableCell align="center" onClick={() => handleSort('timestamp')} style={{ cursor: 'pointer' }}>
                                <strong>{t('audit.auditForm.timestamp')}</strong>{' '}
                                {sortBy === 'timestamp' && (sortOrder === 'asc' ? '🔼' : '🔽')}
                            </TableCell>
                            <TableCell align="center"><strong>{t('basic.actions')}</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {auditData && auditData.map((audit, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{audit.username}</TableCell>
                            <TableCell align="center">{audit.method}</TableCell>
                            <TableCell align="center">{audit.path}</TableCell>
                            <TableCell align="center">{new Date(audit.timestamp).toLocaleString()}</TableCell>
                            <TableCell align="center">
                                <Button variant="contained" color="primary" onClick={() => handleOpenInformationModal(audit)}>
                                    {t('audit.viewDetails')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DefaultDataTable>
)}

export default AuditPage;