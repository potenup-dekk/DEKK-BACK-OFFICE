import { redirect } from "next/navigation";

import navItems from "@/widgets/sidebar/model/nav-items.const";

const Page = () => {
  const firstNavigationHref = navItems[0]?.href;

  if (firstNavigationHref) {
    redirect(firstNavigationHref);
  }

  return (
    <section className="h-full rounded-md border border-dashed border-border bg-card" />
  );
};

export default Page;
