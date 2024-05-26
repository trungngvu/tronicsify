import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { hideDialog, selectDialog } from "@/redux/slices/DialogSlice";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export default function DialogModal() {
  const dialog = useAppSelector(selectDialog);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(hideDialog());
  };

  let typeModal = "";
  if (dialog.msgs.length > 0) {
    let check = dialog.msgs.some((msg) => msg.type == "error");
    if (check) {
      typeModal = "error";
    } else {
      typeModal = "success";
    }
  }

  return (
    <>
      <Dialog
        open={dialog.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className={`font-bold ${
            typeModal == "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-slate-800"
          }`}
          id="alert-dialog-title"
        >
          {dialog.header}
        </DialogTitle>
        <DialogContent className="mt-4">
          {dialog.msgs.length > 0 &&
            dialog.msgs.map((item, i) => (
              <p className="flex items-center mb-2" key={i}>
                {typeModal == "error" ? (
                  <ExclamationTriangleIcon className="w-6 h-6 fill-red-500" />
                ) : (
                  <CheckCircleIcon className="w-6 h-6 fill-green-500" />
                )}
                <span className="ml-2">{item.msg}</span>
              </p>
            ))}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
