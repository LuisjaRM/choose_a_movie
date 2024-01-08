import "./ConfirmModal.css";
// Material icons
import { SvgIcon } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const ConfirmModal = ({ message, error }) => {
  return (
    <section className="modal-back none">
      <section className="modal-body small">
        {message && (
          <>
            <p>{message}</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50"
              width="50"
              viewBox="0 0 118.43873 118.43873"
            >
              <path
                className="check"
                strokeLinejoin="round"
                d="M34.682 60.352l15.61 15.61 33.464-33.464"
                stroke="#f7f7f7"
                strokeLinecap="round"
                strokeWidth="4.3"
                fill="none"
              />
              <circle
                className="circle"
                strokeLinejoin="round"
                cx="59.219"
                strokeLinecap="round"
                stroke="#f7f7f7"
                cy="59.219"
                r="57.069"
                strokeWidth="4.3"
                fill="none"
              />
            </svg>
          </>
        )}

        {error && (
          <>
            <p className="invalidate">{error}</p>

            <SvgIcon
              className="icon icon--invalidate"
              component={HighlightOffIcon}
              inheritViewBox
            />
          </>
        )}
      </section>
    </section>
  );
};
