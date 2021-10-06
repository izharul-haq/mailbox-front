import React from 'react';

interface Props {
  output?: string;
}

const OutputTable: React.FC<Props> = ({ output }) => {
  return (
    <table className="table-auto min-w-max text-sm w-full text-[1rem]">
      <thead>
        <tr>
          <th className="table-header">Output</th>
        </tr>
      </thead>
      <tbody className="table-body">
        <tr className="text-center">
          <td className="table-cell">
            <textarea className="input-text" readOnly value={output} placeholder="Result will be displayed here" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OutputTable;
