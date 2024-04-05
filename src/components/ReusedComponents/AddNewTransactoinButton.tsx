import { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Transaction from "../ReusedComponents/Transaction";
import "./AddNewTransactoinButton.css";

interface TransactionProps {
  userId: string;
  updateTransactions: (update: boolean) => void;
}

function AddNewTransactoinButton(props: TransactionProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.updateTransactions(true);
    console.log("handleClose is running");
  };
  // const OnTransactionSave = (newRow: any) => {
  //   handleClose();
  // };
  const OnTransactionSave = () => {
    handleClose();
  };

  return (
    <div>
      <div className="plus-btn">
        <Button
          className="fixedButton"
          variant="outlined"
          onClick={handleClickOpen}
        >
          <AddCircleOutlineIcon></AddCircleOutlineIcon>
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Transaction</DialogTitle>
          <DialogContent>
            <Transaction
              onTransactionSave={OnTransactionSave}
              id={props.userId}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AddNewTransactoinButton;
