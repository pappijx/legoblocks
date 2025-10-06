import { NestedStructure, RecurringNodeProps } from 'headless-lego';
import { useState } from 'react';
import { nestedData, NestedDataProps } from './data/nestedStructuredata';
import {
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
} from 'react-icons/ai';

const NestedStructureComponent = ({
  node,
  deleteNode,
  addNode,
  children,
}: RecurringNodeProps<NestedDataProps>) => {
  return (
    <div className="flex flex-col">
      <div
        className={`flex w-[200px] justify-between items-center p-0.5 hover:bg-hover text-text`}
      >
        {node?.name}
        <div className="flex gap-1">
          {node?.type === 'folder' && (
            <>
              <AiOutlineDelete onClick={deleteNode} />
              <AiOutlineFileAdd
                onClick={() =>
                  addNode &&
                  addNode({
                    name: 'BABABABAB',
                    type: 'file',
                  })
                }
              />
              <AiOutlineFolderAdd
                onClick={() =>
                  addNode &&
                  addNode({
                    name: 'BABABABAB',
                    type: 'folder',
                  })
                }
              />
            </>
          )}
        </div>
      </div>
      <div style={{ paddingLeft: '5px' }}>{children}</div>
    </div>
  );
};

const NestedStructurePage = () => {
  const [treeData, setTreeData] = useState<NestedDataProps[]>(nestedData);

  return (
    <div className={`p-8 text-text`}>
      <h1 className="text-3xl font-bold mb-4">Nested Structure</h1>
      <NestedStructure
        recurringNode={<NestedStructureComponent />}
        recurringData={treeData}
        updatedRecurringData={setTreeData}
      />
    </div>
  );
};

export default NestedStructurePage;
