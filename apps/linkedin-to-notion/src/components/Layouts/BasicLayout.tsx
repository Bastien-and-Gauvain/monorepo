import type { ReactNode } from 'react';
import recruitivity_icon from 'url:./../../../assets/icon.png';

export const BasicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="plasmo-bg-background-light plasmo-h-screen plasmo-w-screen">
      <img
        src={recruitivity_icon}
        alt="Recruitivity Logo"
        className="plasmo-absolute plasmo-top-0 plasmo-left-0 plasmo-m-9 plasmo-w-12 plasmo-h-12 plasmo-z-20"
      />
      <div className="plasmo-bg-background-dark plasmo-rounded-b-[236px] plasmo-h-[350px] plasmo-w-full plasmo-absolute" />
      <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-absolute plasmo-z-10 xl:plasmo-pt-28 md:plasmo-pt-20 plasmo-p-12 plasmo-gap-12 plasmo-w-full">
        {children}
      </div>
    </div>
  );
};
