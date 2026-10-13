import { CartDrawer } from "@/components/layout/CartDrawer";
import { ZooneticsFooter } from "@/components/layout/ZooneticsFooter";
import { ZooneticsHeader } from "@/components/layout/ZooneticsHeader";

export default function CoasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ZooneticsHeader />
      <main>{children}</main>
      <ZooneticsFooter />
      <CartDrawer />
    </>
  );
}
