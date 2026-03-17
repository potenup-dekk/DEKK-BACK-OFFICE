import SignOutButton from "@/features/admin-auth/sign-out";
import Avatar from "@/shared/ui/avatar";
import type BackofficeHeaderProps from "@/widgets/header/model/props.type";
import backofficeHeaderStyle from "@/widgets/header/style";

const BackofficeHeader = ({ className }: BackofficeHeaderProps) => {
  const slots = backofficeHeaderStyle();

  return (
    <header className={[slots.root(), className].filter(Boolean).join(" ")}>
      <div className={slots.leftGroup()}>
        <h1 className={slots.title()}>관리 콘솔</h1>
      </div>
      <div className={slots.rightGroup()}>
        <Avatar label="관" />
        <SignOutButton />
      </div>
    </header>
  );
};

export default BackofficeHeader;
