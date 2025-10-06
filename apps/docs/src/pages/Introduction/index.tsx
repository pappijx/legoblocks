import MarkdownRenderer from '../../components/MarkdownRenderer';
// Import markdown as plain text
import headlessLegoDoc from './intro.md?raw';

const Introduction = () => {
  return (
    <div className={`p-8 text-text`}>
      <MarkdownRenderer markdownContent={headlessLegoDoc} />
    </div>
  );
};

export default Introduction;
