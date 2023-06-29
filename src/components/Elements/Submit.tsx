import React, { FC, useState } from 'react';
import { classNamesConcat } from '../../lib/utils';
import { ClassNames } from '../../types';
import { TailSpin } from 'react-loader-spinner';

interface Props {
  label?: string;
  classNames?: ClassNames;
}

export const Submit: FC<Props> = ({ classNames, label }) => {
  const [onClick, setOnClick] = useState(false);
  return (
    <button
      type="submit"
      onClick={() => setOnClick(true)}
      className={classNamesConcat(
        classNames?.button ||
          'inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white border border-transparent rounded-md shadow-sm bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500'
      )}
    >
      {onClick ? (
        <TailSpin color="#1f2937" height={15} width={15} />
      ) : (
        label || 'Submit'
      )}
    </button>
  );
};
