import React, { FC, useContext, useEffect } from 'react';
import { getOptionsSchema } from '../../lib/elements';
import { ClassNames } from '../../types';
import { ButtonLink } from '../Elements/ButtonLink';
import { Cards } from '../Elements/Cards';
import { Checkbox } from '../Elements/Checkbox';
import { Email } from '../Elements/Email';
import { Number } from '../Elements/Number';
import { Phone } from '../Elements/Phone';
import { Radio } from '../Elements/Radio';
import { Submit } from '../Elements/Submit';
import { Text } from '../Elements/Text';
import { Textarea } from '../Elements/Textarea';
import { Website } from '../Elements/Website';
import { DateTime } from '../Elements/DateTime';
import { Select } from '../Elements/Select';
import { Password } from '../Elements/Password';
import { File } from '../Elements/File';
import { CurrentPageContext, SchemaContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';

interface Option {
  label: string;
  value: string;
}

export interface SnoopElementProps {
  type: string;
  name: string;
  label?: string;
  link?: string;
  help?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  classNames?: ClassNames;
  required?: boolean;
  options?: Option[] | string[];
  optionsSelect?:{};
  cols?: number;
  rows?: number;
  defaultValue?: string | string[];
  autoSubmit?: boolean;
  accept?: string;
  refFile?: {[key: string]: any};
}

export const SnoopElement: FC<SnoopElementProps> = ({
  type,
  name,
  label = undefined,
  link = '',
  help = undefined,
  icon,
  placeholder,
  classNames = {},
  required = false,
  options,
  optionsSelect,
  defaultValue,
  cols,
  rows,
  autoSubmit = false,
  accept,
  refFile
}) => {
  const { schema, setSchema } = useContext(SchemaContext);
  const pageName = useContext(PageContext);
  const { currentPageIdx } = useContext(CurrentPageContext);

  useEffect(() => {
    setSchema((schema: any) => {
      if (pageName === '') {
        console.warn(
          `KDA Sourcing: An Element must always be a child of a page!`
        );
        return;
      }
      const newSchema = { ...schema };
      let pageIdx = newSchema.pages.findIndex((p: any) => p.name === pageName);
      if (pageIdx === -1) {
        console.warn(`KDA Sourcing: Error accessing page`);
        return;
      }
      let elementIdx = newSchema.pages[pageIdx].elements.findIndex(
        (e: any) => e.name === name
      );
      if (elementIdx === -1) {
        newSchema.pages[pageIdx].elements.push({ name });
        elementIdx = newSchema.pages[pageIdx].elements.length - 1;
      }
      newSchema.pages[pageIdx].elements[elementIdx].type = type;
      newSchema.pages[pageIdx].elements[elementIdx].label = label;
      newSchema.pages[pageIdx].elements[elementIdx].help = help;
      if (['checkbox', 'radio'].includes(type)) {
        newSchema.pages[pageIdx].elements[
          elementIdx
        ].options = getOptionsSchema(options);
      }
      return newSchema;
    });
  }, [name, setSchema, pageName]);

  return (
    <div>
      {currentPageIdx ===
        schema.pages.findIndex((p: any) => p.name === pageName) && (
        <div>
          {type === 'cards' ? (
            <Cards
              name={name}
              label={label}
              help={help}
              cols={cols}
              classNames={classNames}
              required={required}
              options={options || []}
              autoSubmit={autoSubmit}
            />
          ) : type === 'checkbox' ? (
            <Checkbox
              name={name}
              label={label}
              help={help}
              classNames={classNames}
              defaultValue={
                typeof defaultValue === 'string' ? [] : defaultValue
              }
              required={required}
              options={options || []}
            />
          ) : type === 'email' ? (
            <Email
              name={name}
              label={label}
              help={help}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
            />
          ) : type === 'number' ? (
            <Number
              name={name}
              label={label}
              help={help}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
            />
          ) : type === 'phone' ? (
            <Phone
              name={name}
              label={label}
              help={help}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
            />
          ) : type === 'radio' ? (
            <Radio
              name={name}
              label={label}
              help={help}
              classNames={classNames}
              required={required}
              options={options || []}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
            />
          ) : type === 'select' ? (
            <Select
              name={name}
              label={label}
              help={help}
              classNames={classNames}
              required={required}
              options={optionsSelect || {}}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
            />
          ) : type === 'date' ? (
            <DateTime
              name={name}
              label={label}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
              help={help}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
            />
          ) : type === 'file' ? (
            <File
              name={name}
              label={label}
              help={help}
              accept={accept}
              Icon={icon}
              classNames={classNames}
              required={required}
              ref={refFile}
            />
          ) : type === 'submit' ? (
            <Submit label={label} classNames={classNames} />
          ) : type === 'button-link' ? (
            <ButtonLink linkTo={link} label={label} classNames={classNames} />
          ) : type === 'text' ? (
            <Text
              name={name}
              label={label}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
              help={help}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
            />
          ) : type === 'password' ? (
            <Password
              name={name}
              label={label}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
              help={help}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
            />
          ) : type === 'textarea' ? (
            <Textarea
              name={name}
              label={label}
              help={help}
              rows={rows}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
            />
          ) : type === 'website' ? (
            <Website
              name={name}
              label={label}
              help={help}
              Icon={icon}
              placeholder={placeholder}
              classNames={classNames}
              required={required}
              defaultValue={
                typeof defaultValue === 'string' ? defaultValue : ''
              }
            />
          ) : null}
          
        </div>
      )}
    </div>
  );
};
