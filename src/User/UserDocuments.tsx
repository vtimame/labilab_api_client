import React, { FunctionComponent, useState } from 'react';
import { Button, Callout, Divider, Spinner } from '@blueprintjs/core';
import { gql, useQuery } from '@apollo/client';
import { DocumentsList } from './UserDocuments/DocumentsList';
import { NewDocumentDialog } from './UserDocuments/NewDocumentDialog';

const USER_DOCUMENTS = gql`
  query userDocuments($userId: String!) {
    userDocuments(userId: $userId) {
      _id
      fileName
      documentName
      folderName
      link
    }
  }
`;

interface UserDocumentsProps {
  userId: string;
}

export const UserDocuments: FunctionComponent<UserDocumentsProps> = (props) => {
  const [newDocument, setNewDocument] = useState<boolean>(false);
  const documentsQuery = useQuery(USER_DOCUMENTS, {
    variables: { userId: props.userId },
  });

  return (
    <div>
      <Divider />
      <Callout>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="bp3-heading mb-0">Документы</h5>
          <Button
            intent={'success'}
            minimal
            icon={'plus'}
            onClick={() => setNewDocument(true)}
            disabled={documentsQuery.loading}
          >
            Добавить документ
          </Button>
          <NewDocumentDialog
            fetch={documentsQuery?.refetch}
            isOpen={newDocument}
            setOpen={setNewDocument}
            userId={props.userId}
          />
        </div>
        {documentsQuery.loading ? (
          <div className="d-flex justify-content-center py-3">
            <Spinner />
          </div>
        ) : documentsQuery?.data?.userDocuments?.length > 0 ? (
          <DocumentsList
            list={documentsQuery?.data?.userDocuments}
            fetch={documentsQuery.refetch}
          />
        ) : (
          <div></div>
        )}
      </Callout>
    </div>
  );
};
