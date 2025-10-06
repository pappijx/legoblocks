import { NestedStructure, RecurringNodeProps } from 'headless-lego';
import { Link, useLocation } from 'react-router-dom';
import { sidenavdata, SideNavDataProp } from './sidenavdata';
import { useEffect, useMemo, useState } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

const SideNavItem = (props: RecurringNodeProps<SideNavDataProp>) => {
  const { node, children } = props;
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isNavItemActive = useMemo(
    () =>
      pathname === node?.route ||
      node?.children?.some((child) => child.route === pathname),
    [pathname, node]
  );
  useEffect(() => {
    setExpanded(!!isNavItemActive);
  }, [isNavItemActive]);

  const activeClass = isNavItemActive ? 'text-blue-500' : 'hover:text-blue-500';

  return (
    <div className={`flex flex-col mb-4 font-semibold`}>
      {node?.route && (
        <Link
          tabIndex={1}
          role="navigation"
          className={`${activeClass} ${activeClass}`}
          to={node?.route}
        >
          {node.label}
        </Link>
      )}
      {node?.children && (
        <div
          tabIndex={1}
          role="button"
          className={`flex justify-between items-center mb-4 cursor-pointer ${activeClass}`}
          onClick={() => setExpanded((prev) => !prev)}
          onKeyDown={() => setExpanded((prev) => !prev)}
        >
          {node?.label}
          {expanded ? <BiChevronDown /> : <BiChevronRight />}
        </div>
      )}
      {children && expanded && <div className="pl-3">{children}</div>}
    </div>
  );
};

const Sidenav = () => {
  return (
    <div
      className={`w-full h-full border-r-2 p-3 bg-surface border-border text-muted`}
    >
      <NestedStructure
        recurringData={sidenavdata}
        recurringNode={<SideNavItem />}
      />
    </div>
  );
};

export default Sidenav;
