import { ActionButtonProps } from "./props.type";
import actionButtonStyle from "./style";

const ActionButton = ({
  label,
  color,
  size,
  onClick,
  type = "button",
  className,
  disabled = false,
}: ActionButtonProps) => {
  const resolvedColor = disabled ? "disabled" : color;

  return (
    <button
      type={type}
      className={actionButtonStyle({ color: resolvedColor, size, className })}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ActionButton;
