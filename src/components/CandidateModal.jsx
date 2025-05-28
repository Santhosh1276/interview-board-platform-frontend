import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Button,
  Grid,
  useTheme,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const CandidateModal = ({ open, onClose, candidate }) => {
  const theme = useTheme();

  if (!candidate) return null;

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = candidate.resumeUrl;
    link.download = `${candidate.name}_resume.pdf`;
    link.click();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Candidate Profile
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Avatar
              src={candidate.image}
              alt={candidate.name}
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <Typography variant="h6" mt={2}>
              {candidate.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {candidate.email}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Mobile:</Typography>
            <Typography>{candidate.mobile}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Skills:</Typography>
            <Typography>
              {candidate.skills?.join(", ") || "Not specified"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Cover Letter:</Typography>
            <Typography whiteSpace="pre-line">
              {candidate.coverLetter}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button
          onClick={handleDownloadResume}
          startIcon={<DownloadIcon />}
          variant="contained"
        >
          Download Resume
        </Button>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CandidateModal;
