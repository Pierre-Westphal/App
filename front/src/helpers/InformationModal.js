// import React from 'react';
// import { Modal, Box, Typography, Button, Container } from '@mui/material';

// const InformationModal = ({ open, handleClose, message }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="imformation-modal-title"
//       aria-describedby="imformation-modal-description"
//     >
//       <Container maxWidth="sm">
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '50%',
//             bgcolor: 'background.paper',
//             border: '2px solid #2196f3',
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography id="information-modal-title" variant="h6" component="h2" color="infomation">
//             Information
//           </Typography>
//           <Typography component="ul" variant="body1" color="infomation">
//             {Array.isArray(message) ? (
//               message.map((msg, index) => (
//                 <Typography component="li" key={index} sx={{ mb: 2 }}>
//                   <Typography component="span" variant="subtitle1">
//                     {index + 1}. Field: {msg.loc[1]}
//                   </Typography>
//                   <Typography component="ul" sx={{ ml: 2 }}>
//                     <Typography component="li">Input: {msg.input}</Typography>
//                     <Typography component="li">Message: {msg.msg}</Typography>
//                   </Typography>
//                 </Typography>
//               ))
//             ) : (
//               <Typography component="li">Message: {JSON.stringify(message)}</Typography>
//             )}
//           </Typography>

//           <Button variant="contained" color="error" onClick={handleClose} sx={{ mt: 2 }}>
//             Close
//           </Button>
//         </Box>
//       </Container>
//     </Modal>
//   );
// };

// export default InformationModal;

import React from 'react';
import { Modal, Box, Typography, Button, Container } from '@mui/material';

const InformationModal = ({ open, handleClose, message }) => {
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
            Information
          </Typography>

          <Typography component="ul" variant="body1" sx={{ pl: 2 }}>
            {message && typeof message === 'object' ? (
              Object.entries(message).map(([key, value], index) => (
                <li key={index}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))
            ) : (
              <li>{String(message)}</li>
            )}
          </Typography>

          <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
            Fermer
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default InformationModal;