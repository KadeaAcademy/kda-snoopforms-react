/* eslint-disable @next/next/no-img-element */
import React, { FC, useContext } from 'react';
import useDefaultValue from '../../hooks/useDefaultValue';
import { setSubmissionValue } from '../../lib/elements';
import { ClassNames } from '../../types';
import { SubmissionContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';

interface Option {
    [key: string]: string;
}

interface Props {
  name: string;
  label?: string;
  help?: string;
  options: {} | string;
  classNames: ClassNames;
  required?: boolean;
  defaultValue?: string;
}

export const Select: FC<Props> = ({
  name,
  label,
  help,
  options,
  classNames,
  defaultValue,
  required,
}) => {
  const { setSubmission }: any = useContext(SubmissionContext);
  const pageName = useContext(PageContext);

  useDefaultValue({ pageName, name, defaultValue });

  return (
    <div>
      {label && (
        <label
          className={
            classNames.label || 'block text-sm font-medium text-gray-700'
          }
        >
          {label}
          {required ? <span className="text-red-600">*</span> : <></>}
        </label>
      )}

      <div className={'relative mt-1 rounded-md shadow-sm'}>
        <select
          name={name}
          defaultValue={defaultValue || "Sélectionnez votre province"}
          id={`input-${name}`}
          className={
            classNames.element ||
            'block w-full border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500 sm:text-sm'
          }
          onChange={e =>
            setSubmissionValue(e.target.value, pageName, name, setSubmission)
          }
          required={required}
        >
          <option
            hidden
            className="block text-sm font-medium text-ui-gray-dark"
          >
            {defaultValue || "Sélectionnez votre province" }
          </option>
          {Object.keys(options).map((option, index) => {
             
            return (
            <option
                key={index}
                className="block text-sm font-medium text-ui-gray-dark"
                value={option}
            >
                {options[option]}
            </option>)
          }
          )}
        </select>
      </div>

      {help && (
        <p className={classNames.help || 'mt-1 text-sm text-gray-500'}>
          {help}
        </p>
      )}
    </div>
  );
};
