import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import OpenedFilesBarTab from "./OpenedFilesBarTab";
import ContextMenu from "./ui/ContextMenu";

const OpenedFilesBar = () => {
  const { openedFiles } = useSelector((state: RootState) => state.tree);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <div className="w-full">
      <div
        className="flex items-center border-b-[1px] border-[#ffffff1f]"
        onContextMenu={e => {
          e.preventDefault();
          setMenuPosition({ x: e.clientX, y: e.clientY });
          setShowMenu(true);
        }}
      >
        {openedFiles.map(file => (
          <OpenedFilesBarTab key={file.id} file={file} />
        ))}
      </div>

      {showMenu && <ContextMenu positions={menuPosition} setShowMenu={setShowMenu} />}
    </div>
  );
};

export default OpenedFilesBar;
