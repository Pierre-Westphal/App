import { Modal, Box, Typography, Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageEnum from '../enums/LanguageEnum';

const RenderMessageContent = ({ data, indent = 0 }) => {
  const { t } = useTranslation();
  if (!data || typeof data !== 'object') {
    return <li style={{ marginLeft: `${indent}px` }}>{t(`audit.informations.${data}`)}</li>;
  }

  return Object.entries(data).map(([key, value], index) => (
    <li key={index} style={{ marginLeft: `${indent}px` }}>
      <strong>{t(`audit.informations.${key}`)}:</strong>
      {typeof value === 'object' ? (
        <Typography component="ul" variant="body1" sx={{ pl: 2 }}>
          <RenderMessageContent data={value} indent={indent + 20} />
        </Typography>
      ) : (
        key === 'language' ? ' ' + t(`${LanguageEnum[value].translation}`) : ` ${String(value)}`
      )}
    </li>
  ));
};

const InformationModal = ({ open, handleClose, message }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="information-modal-title"
      aria-describedby="information-modal-description"
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            bgcolor: 'background.paper',
            border: '2px solid #2196f3',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="information-modal-title" variant="h6" component="h2" color="primary" gutterBottom>
            {t('basic.information')}
          </Typography>

          <Typography component="ul" variant="body1" sx={{ pl: 2 }}>
            <RenderMessageContent data={message} />
          </Typography>

          <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
            {t('basic.close')}
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default InformationModal;