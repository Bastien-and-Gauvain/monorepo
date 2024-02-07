import { ImageLogo } from '../..';

export type OpenExtensionBubbleProps = {
  onClick?: () => void;
};

export const OpenExtensionBubble = ({ onClick }: OpenExtensionBubbleProps) => {
  return (
    <div onClick={onClick} className="plasmo-m-5">
      <ImageLogo className="plasmo-opacity-80 hover:plasmo-opacity-100 hover:plasmo-scale-125 plasmo-transition-all plasmo-transition-200" />
    </div>
  );
};
