/* eslint-disable @next/next/no-img-element */
import React, { FC, useContext } from 'react';
import useDefaultValue from '../../hooks/useDefaultValue';
import { setSubmissionValue } from '../../lib/elements';
import { ClassNames } from '../../types';
import { SubmissionContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';

interface Option {
  label: string;
  value: string;
  image?: string;
}

interface Props {
  name: string;
  label?: string;
  help?: string;
  options: (Option | string)[];
  placeholder?: string;
  classNames: ClassNames;
  required?: boolean;
  defaultValue?: string;
}

export const Radio: FC<Props> = ({
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
      <fieldset className="mt-2">
        <legend className="sr-only">Please choose an option</legend>
        <div className="space-y-2">
          {options.map(option => {
            const id = (typeof option === 'object'
              ? option.label + name
              : option + name
            ).replace(/ /gi, '_');
            return (
              <div
                key={typeof option === 'object' ? option.label : option}
                className="flex items-center"
              >
                <input
                  defaultChecked={
                    (typeof option === 'object' ? option.label : option) ===
                    defaultValue
                  }
                  id={id}
                  name={name}
                  type="radio"
                  className={
                    classNames.element ||
                    'focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300'
                  }
                  onChange={() =>
                    setSubmissionValue(
                      typeof option === 'object' ? option.label : option,
                      pageName,
                      name,
                      setSubmission
                    )
                  }
                  onClick={() =>
                    setSubmissionValue(
                      typeof option === 'object' ? option.label : option,
                      pageName,
                      name,
                      setSubmission
                    )
                  }
                  required={required}
                />
                <label
                  htmlFor={id}
                  className={
                    classNames.elementLabel ||
                    'block ml-3 text-base font-medium text-gray-700'
                  }
                >
                  {typeof option === 'object' ? (
                    <div className="flex items-center gap-4">
                      {option.label}
                      {option.image && (
                        <img
                          src={option.image}
                          alt={label}
                          className="w-2/5 border"
                        />
                      )}
                    </div>
                  ) : (
                    option
                  )}
                </label>
                <div></div>
              </div>
            );
          })}
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
