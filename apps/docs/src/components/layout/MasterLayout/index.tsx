import { PropsWithChildren } from 'react';
import Sidenav from '../Sidenav';
import TopNav from '../TopNav';

const MasterLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div
      className={`flex flex-col h-screen w-screen overflow-hidden bg-background text-text`}
    >
      <TopNav />
      <div className="flex h-[calc(100vh-60px)]">
        <div className="h-full w-[15%]">
          <Sidenav />
        </div>
        <div className="w-[85%] h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default MasterLayout;
