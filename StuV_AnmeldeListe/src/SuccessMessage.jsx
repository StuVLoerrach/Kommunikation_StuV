import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const getRandomMessage = (firstName) => {
  const messages = [
    `Vielen Dank, ${firstName}, für deine großartige Unterstützung!`,
    `Es war so schön, mit dir zusammenzuarbeiten, ${firstName}. Herzlichen Dank!`,
    `Deine Hilfe hat mir wirklich geholfen, ${firstName}. Danke vielmals!`,
    `Ein herzliches Dankeschön, ${firstName}, für deine Freundlichkeit und Geduld.`,
    `${firstName}, ich schätze deine Hilfe sehr. Vielen Dank!`,
    `Vielen Dank, ${firstName}, für dein Engagement und deine hervorragende Arbeit.`,
    `Deine Großzügigkeit hat mich wirklich berührt, ${firstName}. Herzlichen Dank!`,
    `Es war ein Vergnügen, dich zu treffen, ${firstName}. Danke für alles!`,
    `Danke, ${firstName}, für deine inspirierende Unterstützung.`,
    `Ich bin so dankbar, dich als Freund/in zu haben, ${firstName}. Vielen Dank!`,
    `Herzlichen Dank, ${firstName}, für dein Vertrauen und deine Zuversicht.`,
    `Deine positive Energie ist ansteckend, ${firstName}. Vielen Dank!`,
    `${firstName}, du machst die Welt um dich herum schöner. Danke dafür!`,
    `Ein großes Dankeschön, ${firstName}, für deine großzügige Hilfe.`,
    `Ich bin dir zutiefst dankbar, ${firstName}. Vielen Dank für alles!`,
    `${firstName}, du bist wirklich ein Segen. Herzlichen Dank für deine Hilfe.`,
    `Danke, ${firstName}, dass du immer da bist, wenn ich dich brauche.`,
    `Deine Freundlichkeit hat meinen Tag erhellt, ${firstName}. Vielen Dank!`,
    `Ich schätze deine Ratschläge und Unterstützung, ${firstName}. Herzlichen Dank!`,
    `Danke, ${firstName}, dass du ein so wundervoller Mensch bist.`,
    `Deine Güte bedeutet mir viel, ${firstName}. Vielen Dank!`,
    `Herzlichen Dank, ${firstName}, für deine großzügige Unterstützung.`,
    `Ich bin so glücklich, dich zu kennen, ${firstName}. Vielen Dank!`,
    `Deine Hilfe hat einen großen Unterschied gemacht, ${firstName}. Danke!`,
    `Ein herzliches Dankeschön, ${firstName}, für alles, was du getan hast.`
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

const SuccessMessage = ({ open, onClose, firstName }) => {
  const message = getRandomMessage(firstName);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Erfolg!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Schließen
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessMessage;
