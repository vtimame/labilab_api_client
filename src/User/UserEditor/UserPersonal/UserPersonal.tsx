import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { User } from '../../../types';
import { FormGroup, TextArea } from '@blueprintjs/core';

interface UserPersonalProps {
  user: User;
  updateUserMutation: Function;
}

export const UserPersonal: FunctionComponent<UserPersonalProps> = (props) => {
  const [hobbies, setHobbies] = useState<string>(props.user.hobbies || '');
  const [professionalHobbies, setProfessionalHobbies] = useState<string>(
    props.user.hobbies || ''
  );

  const updateHobbies = () => {
    props.updateUserMutation({
      variables: { payload: { _id: props.user._id, hobbies } },
    });
  };

  const updateProfessionalHobbies = () => {
    props.updateUserMutation({
      variables: { payload: { _id: props.user._id, professionalHobbies } },
    });
  };

  return (
    <div className="row">
      <FormGroup label="Увлечения" className="col-12 mb-0">
        <TextArea
          fill
          value={hobbies}
          onBlur={updateHobbies}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setHobbies(event.target.value)
          }
        />
      </FormGroup>
      <FormGroup label="Профессиональные увлечения" className="col-12 mb-0">
        <TextArea
          fill
          value={professionalHobbies}
          onBlur={updateProfessionalHobbies}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setProfessionalHobbies(event.target.value)
          }
        />
      </FormGroup>
    </div>
  );
};
