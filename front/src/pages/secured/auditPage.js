import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { apiRequest } from '../../commons/Request';
import DefaultDataTable from '../defaultDataTable';
import { useTranslation } from 'react-i18next';
import InformationModal from '../../helpers/InformationModal';


const AuditPage = () => {
    const [auditData, setAuditData] = React.useState([]);
    const [auditDataDetails, setAuditDataDetails] = React.useState({});
    const [showInformationModal, setShowInformationModal] = React.useState(false);
    const { t } = useTranslation();
    
    
    const fetchAuditData = () => {
        apiRequest('audits', 'GET').then((data) => {
        setAuditData(data);
        });
    };

    const handleCloseInformationModal = () => {
        setShowInformationModal(false)
        // Implement the logic to view audit details
    };

    const handleOpenInformationModal = (audit) => {
        const auditDetails = {
            username: audit.username,
            method: audit.method,
            path: audit.path,
            timestamp: new Date(audit.timestamp).toLocaleString(),
            details: audit.details
        }
        setAuditDataDetails(auditDetails);
    };

    React.useEffect(() => {
    if (auditDataDetails && Object.keys(auditDataDetails).length > 0) {
        setShowInformationModal(true);
    }
    }, [auditDataDetails]);
    
    React.useEffect(() => {
        fetchAuditData();
    }, []);
    
    return (
        <DefaultDataTable>
        <InformationModal
            open={showInformationModal}
            handleClose={handleCloseInformationModal}
            message={auditDataDetails}
        />
        <div>
            <h1 className='text-green-800 text-4xl'>{t(`audit.title`)}</h1>
      <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"> <strong>{t('audit.auditForm.username')}</strong></TableCell>
                        <TableCell align="center"><strong>{t('audit.auditForm.method')}</strong></TableCell>
                        <TableCell align="center"><strong>{t('audit.auditForm.path')}</strong></TableCell>
                        <TableCell align="center"><strong>{t('audit.auditForm.timestamp')}</strong></TableCell>
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
        </div>
        </DefaultDataTable>
    );
}

export default AuditPage;