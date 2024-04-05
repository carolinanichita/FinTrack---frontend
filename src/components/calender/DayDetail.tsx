import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import TabelDay from "../Daily/TabelDay";
import "./DayDetail.css";

export interface Row {
  date: string;
  category: string;
  description: string;
  amount: number;
}

interface TableDay {
  rows: Row[];
  date: string;
}

type DayDetailProps = {
  openModal: boolean;
  onClose: () => void;
  table: TableDay | undefined;
};

const DayDetail = ({ openModal, onClose, table }: DayDetailProps) => {
  useEffect(() => {
    if (openModal) {
      setOpen(true);
    }
  }, [openModal]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  console.log("table", table);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalContainer">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {table?.date}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {table ? <TabelDay dateProp={table.date} table={table} /> : null}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default DayDetail;
