import MarkdownRenderer from '../../components/MarkdownRenderer';
import nestedStructure from './nestedStructure.md?raw';
import PlayGround from './PlayGround';

const NestedStructurePage = () => {
  return (
    <div className="flex flex-col gap-5 max-w-[80%] mx-auto pb-5">
      <div className={`p-8 pb-0 text-text`}>
        <MarkdownRenderer markdownContent={nestedStructure} />
      </div>

      <PlayGround />
    </div>
  );
};

export default NestedStructurePage;
