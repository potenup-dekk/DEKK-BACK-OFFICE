import cn from "@/shared/lib/utils";

interface AvatarProps {
  label: string;
  className?: string;
}

const Avatar = ({ label, className }: AvatarProps) => {
  return (
    <div
      aria-label="user avatar"
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground",
        className,
      )}
    >
      {label}
    </div>
  );
};

export default Avatar;
