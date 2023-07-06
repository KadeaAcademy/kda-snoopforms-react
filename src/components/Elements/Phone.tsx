import React, { FC, useContext } from 'react';
import useDefaultValue from '../../hooks/useDefaultValue';
import { setSubmissionValue } from '../../lib/elements';
import { classNamesConcat } from '../../lib/utils';
import { TextFieldProps } from '../../types';
import { SubmissionContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';

export const Phone: FC<TextFieldProps> = ({
  name,
  label,
  help,
  Icon,
  classNames,
  placeholder,
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
      <div className="relative mt-1 rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <div className="w-5 h-5 text-gray-400 ">{Icon}</div>
          </div>
        )}

        <input
          type="tel"
          defaultValue={defaultValue}
          name={name}
          id={`input-${name}`}
          className={classNamesConcat(
            Icon ? 'pl-10' : '',
            classNames.element ||
              `block w-full border-${
                error ? 'red' : 'gray'
              }-300 rounded-md focus:ring-slate-500 focus:border-slate-500 sm:text-sm`
          )}
          placeholder={placeholder}
          pattern="^(\+243|0)[0-9]{9}$"
          onInvalid={(e: any) =>
            e.target.setCustomValidity('please enter a valid phone number')
          }
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
