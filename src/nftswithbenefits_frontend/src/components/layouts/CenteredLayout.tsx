import { PropsWithChildren } from 'react';

export const CenteredLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      {children}
    </div>
  );
};
