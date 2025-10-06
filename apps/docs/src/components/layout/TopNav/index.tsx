import ThemeToggle from '../../ThemeToggle';

const TopNav = () => {
  return (
    <div
      className={`h-[60px] border-b-2 flex items-center justify-between px-4 bg-surface border-border`}
    >
      <div className="font-semibold">Docs</div>
      <ThemeToggle />
    </div>
  );
};

export default TopNav;
