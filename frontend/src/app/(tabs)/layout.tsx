import TabBar from "@/components/common/TabBar";
import { UiProvider } from "@/components/common/UiProvider";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <UiProvider>
      <div className="absolute inset-0 flex flex-col">
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        <TabBar />
      </div>
    </UiProvider>
  );
}
