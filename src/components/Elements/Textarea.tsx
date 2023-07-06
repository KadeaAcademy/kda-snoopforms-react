import React, { FC, useContext } from 'react';
import { setSubmissionValue } from '../../lib/elements';
import { SubmissionContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';
import { TextFieldProps } from '../../types';
import { classNamesConcat } from '../../lib/utils';
import useDefaultValue from '../../hooks/useDefaultValue';

export const Textarea: FC<TextFieldProps> = ({
  name,
  label,
  help,
  classNames,
  placeholder,
  rows,
  required,
  defaultValue,
  error,
}) => {
  const { setSubmission } = useContext(SubmissionContext);
  const pageName = useContext(PageContext);

  useDefaultValue({ pageName, name, defaultValue });

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={
            classNames.label || 'block text-sm font-medium text-gray-700'
          }
        >
          {label}
          {required ? <span className="text-red-600">*</span> : <></>}
        </label>
      )}
      <div className="mt-1">
        <textarea
          name={name}
          id={`input-${name}`}
          defaultValue={defaultValue}
          rows={rows}
          placeholder={placeholder}
          className={classNamesConcat(
            `block w-full border border-${
              error ? 'red' : 'gray'
            }-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm`,
            classNames.element
          )}
          onChange={e =>
            setSubmissionValue(e.target.value, pageName, name, setSubmission)
          }
        />
      </div>
      {help && (
        <p className={classNames.help || 'mt-2 text-sm text-gray-500'}>
          {help}
        </p>
      )}
    </div>
  );
};
