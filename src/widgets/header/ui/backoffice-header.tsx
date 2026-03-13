import { Bell, Search } from "lucide-react";

import Avatar from "@/shared/ui/avatar";
import Input from "@/shared/ui/input";
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
        <div className="relative w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="검색" />
        </div>
        <button
          aria-label="notifications"
          className={slots.iconButton()}
          type="button"
        >
          <Bell size={16} />
        </button>
        <Avatar label="관" />
      </div>
    </header>
  );
};

export default BackofficeHeader;
