import { useState } from "react";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import BottomArrowIcon from "./SVG/Bottom";
import RightArrowIcon from "./SVG/Right";
import { useDispatch, useSelector } from "react-redux";
import { setClickedFileAction, setOpenedFilesAction } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { id, name, isFolder, children, content } = fileTree;

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { openedFiles } = useSelector((state: RootState) => state.tree);
  const dispatch = useDispatch();

  // ** Handlers
  const toggle = () => setIsOpen((prev) => !prev);

  const onFileClicked = () => {
    dispatch(setClickedFileAction({ filename: name, fileContent: content, activeTabId: id }));

    const exists = openedFiles.some((file) => file.id === id);
    if (exists) return;
    dispatch(setOpenedFilesAction([...openedFiles, fileTree]));
  };

  return (
    <div className="w-full mb-1 ml-2 cursor-pointer">
      <div className="flex items-center mb-1">
        {isFolder ? (
          <div onClick={toggle} className="w-full flex items-center hover:bg-[#393450]">
            <span className="mr-2">{isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}</span>

            <RenderFileIcon filename={name} isFolder isOpen={isOpen} />
            <span className="ml-2 text-lg">{name}</span>
          </div>
        ) : (
          <div className="w-full flex items-center ml-6 hover:bg-[#393450]" onClick={onFileClicked}>
            <RenderFileIcon filename={name} />
            <span className="ml-2 text-lg">{name}</span>
          </div>
        )}
      </div>

      {isOpen && children && children.map((file, idx) => <RecursiveComponent fileTree={file} key={idx} />)}
    </div>
  );
};

export default RecursiveComponent;
