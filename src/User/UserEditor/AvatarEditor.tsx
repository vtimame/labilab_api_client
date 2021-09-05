import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Avatar from 'react-avatar';
import { Icon } from '@blueprintjs/core';
import { useStore } from '../../store/Store';
import { AvatarCropper } from './AvatarCropper';

interface AvatarEditorProps {
  userId: string;
  name: string;
  surname: string;
  avatar?: string | null | undefined;
  setUser: Function;
  fetchUser: Function;
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const AvatarEditor: FunctionComponent<AvatarEditorProps> = observer(
  (props) => {
    const { app } = useStore();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [image, setImage] = useState<File>();
    const [sourceImage, setSourceImage] = useState<string>();

    const getNewImage = () => {
      const avatarInput = document.getElementById('avatar-editor-image-source');
      if (avatarInput) avatarInput.click();
    };

    const onSourceImagePicked = async (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const imageSource = event.target.files![0];
      const base64 = await toBase64(imageSource);
      setSourceImage(String(base64));
      setImage(imageSource);
    };

    return (
      <div style={{ position: 'relative' }}>
        <input
          type="file"
          id="avatar-editor-image-source"
          hidden
          onChange={onSourceImagePicked}
        />
        <Avatar
          size="86"
          src={props.avatar || undefined}
          name={`${props.surname} ${props.name}`}
          round
        />
        <AvatarCropper
          setSource={setSourceImage}
          source={sourceImage}
          userId={props.userId}
          fetchUser={props.fetchUser}
        />
        <div
          onClick={() => getNewImage()}
          style={{
            position: 'absolute',
            right: 1,
            bottom: 1,
            background: app.isDark ? 'white' : '#202B33',
            width: '28px',
            height: '28px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: !app.isDark ? 'white' : '#202B33',
            borderRadius: '100%',
            cursor: 'pointer',
          }}
        >
          <Icon icon={'media'} style={{ marginBottom: '-2px' }} iconSize={14} />
        </div>
      </div>
    );
  }
);
