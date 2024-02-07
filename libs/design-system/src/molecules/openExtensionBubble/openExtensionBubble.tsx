import { ImageLogo } from '../..';

export type OpenExtensionBubbleProps = {
  onClick: () => void;
};

export const OpenExtensionBubble = ({ onClick }: OpenExtensionBubbleProps) => {
  return (
    <div onClick={onClick}>
      <ImageLogo className="plasmo-opacity-80 hover:plasmo-opacity-100 hover:plasmo-scale-[0.15] plasmo-transition-all plasmo-transition-200" />
    </div>
  );
};
