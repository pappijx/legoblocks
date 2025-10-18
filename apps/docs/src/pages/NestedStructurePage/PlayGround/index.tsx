import { NestedStructure, RecurringNodeProps } from '@legoblock/ui';
import { useEffect, useState, type ReactNode } from 'react';
import { nestedData, NestedDataProps } from './data/nestedStructuredata';
import { nestedFiltersData, FilterNode } from './data/nestedFiltersData';
import {
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
  AiTwotoneHtml5,
} from 'react-icons/ai';
import {
  BiChevronDown,
  BiChevronRight,
  BiFile,
  BiFolder,
} from 'react-icons/bi';
import { TbBrandTypescript, TbFileTypeTsx } from 'react-icons/tb';
import { VscJson } from 'react-icons/vsc';
import { PiFilePngDuotone } from 'react-icons/pi';
import { ImSvg } from 'react-icons/im';
import { FaGitAlt, FaMarkdown } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';

const fileExtensionWiseIcon: Record<string, ReactNode> = {
  tsx: <TbFileTypeTsx />,
  json: <VscJson />,
  ts: <TbBrandTypescript />,
  html: <AiTwotoneHtml5 />,
  png: <PiFilePngDuotone />,
  svg: <ImSvg />,
  md: <FaMarkdown />,
  js: <IoLogoJavascript />,
  gitignore: <FaGitAlt />,
  default: <BiFile />,
};

const NestedStructureComponent = ({
  node,
  deleteNode,
  addNode,
  updateNode,
  children,
}: RecurringNodeProps<NestedDataProps>) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setIsExpanded(true);
  }, []);

  return (
    <div className="flex flex-col">
      <div
        className={`group z-10 relative flex w-[200px] h-[24px] justify-between items-center py-0.5 px-1 text-text`}
      >
        <div className="absolute z-[-1] w-[200px] h-[24px] left-0 top-0 group-hover:bg-hover"></div>
        <div
          className="flex gap-1 items-center"
          onDoubleClick={() => setIsSelected(true)}
        >
          {children && (children as React.ReactNode[])?.length > 0 && (
            <div onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? <BiChevronDown /> : <BiChevronRight />}
            </div>
          )}

          {node?.type === 'folder' ? (
            <BiFolder />
          ) : (
            fileExtensionWiseIcon[node?.name?.split('.')[1] || ''] ??
            fileExtensionWiseIcon['default']
          )}

          {isSelected ? (
            <input
              onBlur={(e) => {
                if (updateNode && node && e.target.value) {
                  updateNode({
                    ...node,
                    name: e.target.value,
                  });
                }
                setIsSelected(false);
              }}
              className="bg-transparent outline-none"
              defaultValue={node?.name || 'Placeholder'}
            />
          ) : (
            <div>{node?.name}</div>
          )}
        </div>

        {!isSelected && (
          <div className="gap-1 hidden group-hover:flex cursor-pointer">
            <AiOutlineDelete onClick={deleteNode} />
            {node?.type === 'folder' && (
              <>
                <AiOutlineFileAdd
                  onClick={() =>
                    addNode &&
                    addNode({
                      name: '',
                      type: 'file',
                    })
                  }
                />
                <AiOutlineFolderAdd
                  onClick={() =>
                    addNode &&
                    addNode({
                      name: '',
                      type: 'folder',
                    })
                  }
                />
              </>
            )}
          </div>
        )}
      </div>
      {isExpanded && children && <div className="pl-4">{children}</div>}
    </div>
  );
};

const PlayGround = () => {
  const [treeData, setTreeData] = useState<NestedDataProps[]>(nestedData);
  const [filters, setFilters] = useState<FilterNode[]>(nestedFiltersData);

  return (
    <div className={`p-8 text-text bg-border rounded-xl h-full`}>
      <h1 className="text-3xl font-bold mb-4">Try it</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-[50%]">
          <h2 className="text-lg font-bold">Folder structure</h2>
          <div className="bg-surface text-text px-2 py-1 rounded-md text-sm font-mono h-[400px] overflow-auto">
            <NestedStructure
              recurringNode={<NestedStructureComponent />}
              recurringData={treeData}
              updatedRecurringData={setTreeData}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[50%]">
          <h2 className="text-lg font-bold">Nested filters</h2>
          <div className="bg-surface text-text px-2 py-1 rounded-md text-sm font-mono h-[400px] overflow-auto">
            <NestedStructure
              recurringNode={<FilterNodeComponent />}
              recurringData={filters}
              updatedRecurringData={setFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayGround;

const FilterNodeComponent = ({
  node,
  children,
  updateAllChildrenNode,
}: RecurringNodeProps<FilterNode>) => {
  const onToggle = (checked: boolean) => {
    if (!updateAllChildrenNode) return;
    updateAllChildrenNode({ selected: checked }, { includeSelf: true });
  };

  return (
    <div className="flex flex-col">
      <label className="flex items-center gap-2 py-0.5">
        <input
          type="checkbox"
          checked={!!node?.selected}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <span>{node?.label}</span>
      </label>
      <div className="pl-4">{children}</div>
    </div>
  );
};
