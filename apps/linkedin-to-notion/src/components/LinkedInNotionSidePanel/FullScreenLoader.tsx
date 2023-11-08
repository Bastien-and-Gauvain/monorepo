import { Loader } from 'design-system';

export const FullScreenLoader = () => {
  return (
    <div className="plasmo-fixed plasmo-top-0 plasmo-left-0 plasmo-w-full plasmo-h-[100vh] plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center plasmo-bg-background-light plasmo-z-40">
      <Loader />
    </div>
  );
};
