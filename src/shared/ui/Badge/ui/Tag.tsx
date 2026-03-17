import { TagProps } from "../props.type";
import { tagStyle, tagLabelStyle } from "../style";

const Tag = ({ label }: TagProps) => {
  return (
    <div className={tagStyle()}>
      <span className={tagLabelStyle()}>{`#${label}`}</span>
    </div>
  );
};

export default Tag;
