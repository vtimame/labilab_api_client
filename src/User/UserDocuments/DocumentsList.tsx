import React, { FunctionComponent } from 'react';
import { Document as UserDocument } from '../../types';
import { DocumentPreview } from './DocumentPreview';

interface DocumentsListProps {
  list: UserDocument[];
  fetch: Function;
}

export const DocumentsList: FunctionComponent<DocumentsListProps> = (props) => {
  return (
    <div className="row mt-2">
      {props.list.map((item) => {
        return (
          <div className="col-4 mb-3" key={item._id}>
            <DocumentPreview document={item} onDelete={() => props.fetch()} />
          </div>
        );
      })}
    </div>
  );
};
