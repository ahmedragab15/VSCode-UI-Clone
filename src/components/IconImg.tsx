interface IProps {
  src: string;
  className?: string;
}

const IconImg = ({ src, className = "w-6 h-w-6" }: IProps) => {
  return <img src={src} className={className} alt="icon" />;
};

export default IconImg;
