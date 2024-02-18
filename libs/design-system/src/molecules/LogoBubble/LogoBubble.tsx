import { ImageLogo } from '../..';

export type LogoBubbleProps = {
  onClick?: () => void;
};

export const LogoBubble = ({ onClick }: LogoBubbleProps) => {
  return (
    <div onClick={onClick} className="plasmo-m-5">
      <ImageLogo className="plasmo-opacity-80 plasmo-cursor-pointer hover:plasmo-opacity-100 hover:plasmo-scale-125 plasmo-transition-all plasmo-transition-200" />
    </div>
  );
};
