import { useDispatch, useSelector } from "react-redux";
import { setClickedFileAction, setOpenedFilesAction, setTabIdToRemoveAction } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";

interface IProps {
  file: IFile;
}

const OpenedFilesBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();

  const {
    openedFiles,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.tree);

  // ** Handlers
  const onClick = () => {
    const { id, name, content } = file;
    dispatch(setClickedFileAction({ filename: name, fileContent: content, activeTabId: id }));
  };

  const onRemove = (selectedId: string) => {
    const filtered = openedFiles.filter((file) => file.id !== selectedId);
    const lastTab = filtered[filtered.length - 1];

    if (!lastTab) {
      dispatch(setOpenedFilesAction([]));
      dispatch(setClickedFileAction({ activeTabId: null, fileContent: "", filename: "" }));
      return;
    }
    const { id, name, content } = lastTab;
    dispatch(setOpenedFilesAction(filtered));
    dispatch(setClickedFileAction({ activeTabId: id, fileContent: content, filename: name }));
  };

  return (
    <div
      className={`max-w-screen-md flex items-center p-2 border-t-2 ${file.id === activeTabId ? "border-[#cf6ccf] bg-[#1e1b2a]" : "border-transparent"}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setTabIdToRemoveAction(file.id));
      }}
    >
      <RenderFileIcon filename={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md">{file.name}</span>
      <span
        className="cursor-pointer hover:bg-[#64646473] duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFilesBarTab;
