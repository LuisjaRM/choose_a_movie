import "./AnswerModal.css";

export const AnswerModal = ({
  answer,
  setResponse,
  setShowAnswerModal,
  setAnswer,
  setMessage,
}) => {
  // HandlesClick
  const handleClickExitModal = () => {
    setShowAnswerModal(false);
    setAnswer("");
    setMessage("");
  };
  const handleClickModal = (e) => {
    e.stopPropagation();
  };
  const handleClickYes = () => {
    setResponse(true);
    setShowAnswerModal(false);
  };
  const handleClickNo = () => {
    setResponse(false);
    setShowAnswerModal(false);
    setAnswer("");
    setMessage("");
  };
  return (
    <section className="modal-back dark" onClick={handleClickExitModal}>
      <section className="modal-body answer" onClick={handleClickModal}>
        <p>{answer}</p>

        <section className="answer-buttons">
          <button
            type="button"
            className="answer-button"
            onClick={handleClickYes}
          >
            Si
          </button>
          <button
            type="button"
            className="answer-button"
            onClick={handleClickNo}
          >
            No
          </button>
        </section>
      </section>
    </section>
  );
};
