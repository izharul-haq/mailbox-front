import React, { useState } from 'react';
import { saveAsTextFile } from '~/utils/text';

interface Props {
  algo: string;
  output?: string;
}

const OutputTable: React.FC<Props> = ({ algo, output }) => {
  const [copied, setCopied] = useState<boolean>(false);
  
  return (
    <>
      <div className="mb-2 rounded-lg shadow">
        <table className="table-auto min-w-max text-sm w-full text-[1rem]">
          <thead>
            <tr>
              <th className="table-header">Output</th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr className="text-center">
              <td className="table-cell">
                <textarea id="output-text" className="input-text" readOnly value={output} placeholder="Result will be displayed here" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <div></div>
        <div className="flex space-x-2">
          <button
            className="button button-primary"
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(output as string);
              setCopied(true);
              setTimeout(() => setCopied(false), 500);
            }}
          >
            {copied ? 'Copied' : 'Copy Text'}
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              saveAsTextFile(`${algo}_result`, output as string)
            }}
          >
            Save to Text File
          </button>
        </div>
      </div>
    </>
  );
};

export default OutputTable;
