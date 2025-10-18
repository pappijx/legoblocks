import MarkdownRenderer from '../../components/MarkdownRenderer';
import PlayGround from './PlayGround';
import searchBar from './searchBar.md?raw';

const SearchbarPage = () => {
  return (
    <div className="flex flex-col gap-5 max-w-[80%] mx-auto pb-5">
      <div className={`p-8 pb-0 text-text`}>
        <MarkdownRenderer markdownContent={searchBar} />
      </div>
      <PlayGround />
    </div>
  );
};

export default SearchbarPage;
