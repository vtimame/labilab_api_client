import 'react-image-crop/dist/ReactCrop.css';

import React, { FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Classes, Drawer } from '@blueprintjs/core';
import { useStore } from '../../store/Store';
import Avatar from 'react-avatar-edit';
import { gql, useMutation } from '@apollo/client';
import { axiosInstance } from '../../utils/axios';

interface AvatarCropperProps {
  userId: string;
  source?: string;
  setSource: Function;
  fetchUser: Function;
}

export const AvatarCropper: FunctionComponent<AvatarCropperProps> = observer(
  ({ setSource, source, userId, fetchUser }) => {
    const { app } = useStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [cropped, setCropped] = useState('');

    const [updateUser] = useMutation(gql`
      mutation updateUser($payload: UpdateUserDto!) {
        updateUser(payload: $payload) {
          _id
        }
      }
    `);

    const loadAvatar = async () => {
      setLoading(true);
      const fetchedUrl = await fetch(cropped);
      const blob = await fetchedUrl.blob();
      const file = new File([blob], `${userId}-avatar`, { type: 'image/png' });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentName', `${userId}-${Date.now()}-avatar`);
      formData.append('bucketName', 'userAvatars');
      formData.append('folderName', userId);
      formData.append('ownerId', userId);

      try {
        const response = await axiosInstance.post('stack/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        await updateUser({
          variables: { payload: { _id: userId, avatarId: response.data?._id } },
        });
        await fetchUser();
        setSource(undefined);
        setCropped('');

        setLoading(false);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };

    return (
      <Drawer
        className={app.isDark ? Classes.DARK : ''}
        isOpen={source !== undefined}
        onClose={() => setSource(undefined)}
      >
        <div
          className={`${Classes.DRAWER_HEADER} d-flex justify-content-between`}
        >
          <div>Загрузить аватар</div>
          <Button
            intent={'success'}
            minimal
            icon={'cloud-upload'}
            onClick={loadAvatar}
            loading={loading}
          >
            Загрузить
          </Button>
        </div>
        <Avatar
          width={777}
          height={777}
          cropRadius={370}
          onCrop={(preview: any) => setCropped(preview)}
          onImageLoad={(preview: any) => setCropped(preview)}
          onClose={() => {}}
          onBeforeFileLoad={() => {}}
          src={String(source)}
          closeIconColor="transparent"
        />
        <div className={Classes.DIALOG_BODY}>
          {/*<ReactCrop*/}
          {/*  src={String(source)}*/}
          {/*  crop={crop}*/}
          {/*  onChange={(newCrop: any) => setCrop(newCrop)}*/}
          {/*/>*/}
        </div>
      </Drawer>
    );
  }
);
