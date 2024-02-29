import Settings from "@/components/chat/settings";

function SideBar() {
  return (
    <div className={"flex flex-col min-h-screen bg-accent w-2/12"}>
      <Settings />
    </div>
  );
}

export default SideBar;
