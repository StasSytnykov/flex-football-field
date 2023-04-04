interface Props {
  onButtonClick: () => void;
}

export const AddButton = ({ onButtonClick }: Props) => (
  <button
    style={{
      position: "absolute",
      zIndex: "99999",
      height: "40px",
      top: "10px",
      right: "60px",
      backgroundColor: "rgb(255, 255, 255)",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
      padding: "0 17px 0 17px",
      borderRadius: "2px",
    }}
    onClick={onButtonClick}
    type="button"
  >
    Add field
  </button>
);
