import MarkdownRenderer from '../../components/MarkdownRenderer';
// Import markdown as plain text
import headlessLegoDoc from './howToInstall.md?raw';

const HowToInstall = () => {
  return (
    <div className={`p-8 text-text max-w-[80%] mx-auto`}>
      <MarkdownRenderer markdownContent={headlessLegoDoc} />
    </div>
  );
};

export default HowToInstall;
