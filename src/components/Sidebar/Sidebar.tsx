import { useAtom } from "jotai";
import { AddNewChat, Settings } from '../../components'
import { isEditAtom } from "../../store";

const Sidebar: React.FC = () => {
  const [isEdit] = useAtom(isEditAtom)

  return (
    <aside className="border-2 rounded-md my-1 shadow-gray-300/60 shadow-lg bg-gray-100 h-screen w-[20vw]">
      {
        isEdit ? <Settings /> : <AddNewChat />
      }
    </aside>
  );
};

export default Sidebar
