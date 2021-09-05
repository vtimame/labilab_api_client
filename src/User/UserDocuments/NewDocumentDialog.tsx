import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { useStore } from '../../store/Store';
import {
  Button,
  Classes,
  Dialog,
  FileInput,
  InputGroup,
} from '@blueprintjs/core';
import { axiosInstance } from '../../utils/axios';

interface NewDocumentDialogProps {
  fetch: Function;
  isOpen: boolean;
  setOpen: Function;
  userId: string;
}

export const NewDocumentDialog: FunctionComponent<NewDocumentDialogProps> = (
  props
) => {
  const { app } = useStore();
  const [documentName, setDocumentName] = useState('');
  const [file, setFile] = useState<Blob | string>('');
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onDocumentSelected = async (event: any) => {
    setFileName(event.target.files[0].name);
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentName', documentName);
    formData.append('bucketName', 'userDocs');
    formData.append('folderName', props.userId);
    formData.append('ownerId', props.userId);

    try {
      await axiosInstance.post('stack/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await props.fetch();
      props.setOpen(false);
      setFileName('');
      setFile('');
      setDocumentName('');
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={() => props.setOpen(false)}
      className={`${app.isDark ? Classes.DARK : ''} pb-0`}
    >
      <div className={Classes.DIALOG_BODY}>
        <div style={{ fontWeight: 600 }} className="mb-2">
          Загрузить документ
        </div>
        <InputGroup
          fill
          autoFocus
          placeholder="Введите название документа..."
          className="mb-2"
          value={documentName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDocumentName(event.target.value)
          }
        />
        <FileInput
          fill
          text={fileName || 'Выберите документ...'}
          buttonText="Поиск"
          className="mb-2"
          onInputChange={onDocumentSelected}
        />
        <Button
          intent={'success'}
          disabled={!file || documentName.length === 0}
          icon={'cloud-upload'}
          fill
          onClick={uploadFile}
          loading={loading}
        >
          Загрзуть
        </Button>
      </div>
    </Dialog>
  );
};
