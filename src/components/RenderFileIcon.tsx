import { extensionIconPaths } from "../constant";
import IconImg from "./IconImg";
import FileIcon from "./SVG/File";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

const RenderFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  const extension = filename.split(".").pop();

  if (extension && Object.prototype.hasOwnProperty.call(extensionIconPaths, extension)) {
    console.log(extension);
    console.log(extensionIconPaths);
    console.log(extensionIconPaths[extension]);
    const iconPath = isFolder ? (isOpen ? `${extensionIconPaths[extension]}-open.svg` : `${extensionIconPaths[extension]}.svg`) : `${extensionIconPaths[extension]}.svg`;

    return <IconImg src={iconPath} />;
  }

  if (isFolder && isOpen) return <IconImg src="/icons/folder-default-open.svg" />;
  if (isFolder && !isOpen) return <IconImg src="/icons/folder-default.svg" />;

  return <FileIcon />;
};

export default RenderFileIcon;
