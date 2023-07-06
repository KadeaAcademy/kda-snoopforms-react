import React, { FC, useContext, useEffect, useState } from 'react';
import useDefaultValue from '../../hooks/useDefaultValue';
import { setSubmissionValue } from '../../lib/elements';
import { ClassNames, ElementErrorType } from '../../types';
import { SubmissionContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  error?: ElementErrorType | false;
  help?: string;
  options: (Option | string)[];
  placeholder?: string;
  classNames: ClassNames;
  required?: boolean;
  defaultValue?: string[];
}

export const Checkbox: FC<Props> = ({
  name,
  label,
  help,
  options,
  classNames,
  defaultValue,
  required,
  error,
}) => {
  const [checked, setChecked] = useState<string[]>([]);
  const { setSubmission }: any = useContext(SubmissionContext);
  const pageName = useContext(PageContext);

  useEffect(() => {
    setSubmissionValue(checked, pageName, name, setSubmission);
  }, [checked]);

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
      <fieldset className="mt-2">
        <div className="mt-2 space-y-2">
          {options.map(option => (
            <div
              className="relative flex items-start"
              key={typeof option === 'object' ? option.label : option}
            >
              <div className="flex items-center h-5">
                <input
                  id={typeof option === 'object' ? option.label : option}
                  name={name}
                  type="checkbox"
                  className={
                    classNames.element ||
                    `focus:ring-slate-500 h-4 w-4 text-slate-600 border-${
                      error ? 'red' : 'gray'
                    }-300 rounded-sm`
                  }
                  defaultChecked={defaultValue?.includes(
                    typeof option === 'object' ? option.label : option
                  )}
                  onChange={e => {
                    const newChecked: string[] = [...checked];
                    const value =
                      typeof option === 'object' ? option.label : option;
                    if (e.target.checked) {
                      newChecked.push(value);
                    } else {
                      const idx = newChecked.findIndex(v => v === value);
                      if (idx >= 0) {
                        newChecked.splice(idx, 1);
                      }
                    }
                    setChecked(newChecked);
                    setSubmissionValue(
                      newChecked,
                      pageName,
                      name,
                      setSubmission
                    );
                  }}
                />
              </div>
              <div className="ml-3 text-base">
                <label
                  htmlFor={typeof option === 'object' ? option.label : option}
                  className={
                    classNames.elementLabel || 'font-medium text-gray-700'
                  }
                >
                  {typeof option === 'object' ? option.label : option}
                </label>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      {help && (
        <p className={classNames.help || 'mt-2 text-sm text-gray-500'}>
          {help}
        </p>
      )}
    </div>
  );
};
