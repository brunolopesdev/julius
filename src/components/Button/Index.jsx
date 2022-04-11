import "./Index.scss";

export const Button = (props) => {
  return (
    <button
      className="button"
      type={props.type}
      onClick={props.data}
      disabled={props.disabled}
    >
      {props.icon && <i>{props.icon}</i>}
      {props.text}
    </button>
  );
};
