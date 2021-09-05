import React, { FunctionComponent } from 'react';
import {
  Button,
  Callout,
  Classes,
  Icon,
  Menu,
  Popover,
  Position,
} from '@blueprintjs/core';
import { Document as UserDocument } from '../../types';
import { gql, useMutation } from '@apollo/client';

interface DocumentPreviewProps {
  document: UserDocument;
  onDelete: Function;
}

export const DocumentPreview: FunctionComponent<DocumentPreviewProps> = (
  props
) => {
  const extension = props.document.fileName.split('.')[
    props.document.fileName.split('.').length - 1
  ];

  // const [deleteDocumentMutation] = useMutation(gql`
  //   mutation deleteMutation($docId: String!) {
  //     deleteDocument(documentId: $docId) {
  //       _id
  //     }
  //   }
  // `);

  const deleteDocument = async () => {
    // await deleteDocumentMutation({ variables: { docId: props.document._id } });
    props.onDelete();
  };

  const openFile = () => {
    // switch (extension) {
    //   case 'pdf':
    //
    //     break;
    //   default:
    //     break;
    // }
    window.open(String(props.document.link), '_blank');
  };

  return (
    <Callout>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Popover
            minimal
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <Menu.Item
                  text="Удалить"
                  icon={'trash'}
                  intent={'danger'}
                  onClick={deleteDocument}
                />
              </Menu>
            }
          >
            <Button minimal small icon={'more'} />
          </Popover>
        </div>
        <div
          style={{ height: '150px' }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            style={{
              fontWeight: 600,
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
            className={Classes.TEXT_MUTED}
            onClick={openFile}
          >
            {extension}
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Icon icon={'document'} className="mr-2" />
          <div
            className={Classes.TEXT_MUTED}
            style={{ fontSize: '13px', cursor: 'pointer' }}
            onClick={openFile}
          >
            {props.document.documentName}
          </div>
        </div>
      </div>
    </Callout>
  );
};
