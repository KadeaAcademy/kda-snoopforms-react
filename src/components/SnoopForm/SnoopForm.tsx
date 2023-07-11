import React, { createContext, FC, ReactNode, useState } from 'react';
import { classNamesConcat } from '../../lib/utils';

export const SchemaContext = createContext({
  schema: { pages: [] },
  setSchema: (schema: any) => {
    console.log(schema);
  },
});

export const SubmissionContext = createContext({
  submission: {},
  setSubmission: (submission: any) => {
    console.log(submission);
  },
});

export const CurrentPageContext = createContext({
  currentPageIdx: 0,
  setCurrentPageIdx: (currentPageIdx: number) => {
    console.log(currentPageIdx);
  },
});



export const SubmitHandlerContext = createContext((pageName: string) => {
  console.log(pageName);
});

interface onSubmitProps {
  submission: any;
  schema: any;
}

export interface Props {
  domain?: string;
  formId?: string;
  protocol?: 'http' | 'https';
  localOnly?: boolean;
  className?: string;
  onSubmit?: (obj: onSubmitProps) => void;
  setFieldErrors?: any;
  page?: any;
  children?: ReactNode;
  setError?: (value: boolean) => void;
  setDisabled?: (value: boolean) => void;
}

export const SnoopForm: FC<Props> = ({
  domain = 'app.snoopforms.com',
  formId,
  protocol = 'https',
  localOnly = false,
  className = '',
  onSubmit = (): any => {},
  setFieldErrors,
  page,
  children,
  setDisabled,
  setError,
}) => {
  const [schema, setSchema] = useState<any>({ pages: [] });
  const [submission, setSubmission] = useState<any>({});
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [submissionSessionId, setSubmissionSessionId] = useState('');

  const handleSubmit = async (pageName: string) => {
    const pageErrors: any = {};
    page.blocks
      .filter((b: any) => /Question/.test(b.type))
      .map((q: any) => {
        const e = submission[page.id][q.id].length;
        pageErrors[q.id] = q.data.required
          ? e
            ? false
            : { message: 'Ce champs est requis' }
          : false;
      });

    setFieldErrors(pageErrors);

    if (Object.values(pageErrors).filter(f => f).length) return;
    let _submissionSessionId = submissionSessionId;
    setDisabled?.(true);
    if (!localOnly) {
      // create answer session if it don't exist
      try {
        if (!formId) {
          console.warn(
            `🦝 SnoopForms: formId not set. Skipping sending submission to snoopHub.`
          );
          return;
        }
        if (!_submissionSessionId) {
          // create new submissionSession in snoopHub
          const submissionSessionRes: any = await fetch(
            `${protocol}://${domain}/api/forms/${formId}/submissionSessions`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({}),
            }
          );
          const submissionSession = await submissionSessionRes.json();
          _submissionSessionId = submissionSession.id;
          setSubmissionSessionId(_submissionSessionId);
        }

        // send answer to snoop platform
        await fetch(`${protocol}://${domain}/api/forms/${formId}/eddvent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            events: [
              {
                type: 'pageSubmission',
                data: {
                  pageName,
                  submissionSessionId: _submissionSessionId,
                  submission: submission[pageName],
                },
              },
              // update schema
              // TODO: do conditionally only when requested by the snoopHub
              { type: 'updateSchema', data: schema },
            ],
          }),
        }).then((response) => {
          if (!response.ok) {
            setDisabled?.(false);
            throw new Error(`${response.status}`);
          }
        });
      } catch (e) {
        setError?.(true);
        
        console.error(
          `🦝 SnoopForms: Unable to send submission to snoopHub. ${e}`
        );
      }
    }
    const maxPageIdx = schema.pages.length - 1;
    const hasThankYou = schema.pages[maxPageIdx].type === 'thankyou';
    if (currentPageIdx < maxPageIdx) {
      setCurrentPageIdx(currentPageIdx + 1);
    }
    if (
      (!hasThankYou && currentPageIdx === maxPageIdx) ||
      (hasThankYou && currentPageIdx === maxPageIdx - 1)
    ) {
      return onSubmit({ submission, schema });
    }
  };

  return (
    <SubmitHandlerContext.Provider value={handleSubmit}>
      <SchemaContext.Provider value={{ schema, setSchema }}>
        <SubmissionContext.Provider value={{ submission, setSubmission }}>
          <CurrentPageContext.Provider
            value={{ currentPageIdx, setCurrentPageIdx }}
          >
            <div className={classNamesConcat('max-w-lg', className)}>
              {children}
            </div>
          </CurrentPageContext.Provider>
        </SubmissionContext.Provider>
      </SchemaContext.Provider>
    </SubmitHandlerContext.Provider>
  );
};
