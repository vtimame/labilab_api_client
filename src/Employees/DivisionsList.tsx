import React, { FunctionComponent } from 'react';
import { Callout, Classes, Divider } from '@blueprintjs/core';
import { DivisionActions } from './DivisionsList/DivisionActions';
import { UsersList } from './UsersList';
import { Division, Maybe } from '../types';
import { Droppable } from 'react-beautiful-dnd';
import dW from 'decline-word';

interface IDivisionsListProps {
  divisions: Maybe<Division>[] | null | undefined;
  reFetchDepartments: Function;
}

export const DivisionsList: FunctionComponent<IDivisionsListProps> = ({
  divisions,
  reFetchDepartments,
}) => {
  return (
    <div>
      {divisions?.map((division, divisionIndex) => {
        return (
          <div key={division?._id}>
            <Droppable droppableId={`${division?._id}`}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Callout
                    style={{ paddingBottom: 0 }}
                    className={
                      snapshot.isDraggingOver ? Classes.INTENT_PRIMARY : ''
                    }
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div style={{ fontWeight: 600 }}>{division?.name}</div>
                        <div>&nbsp;-&nbsp;</div>
                        <div
                          className={`${Classes.TEXT_MUTED} d-flex`}
                          style={{ fontSize: '13px' }}
                        >
                          <div>
                            {division?.users?.length}{' '}
                            {dW(
                              division?.users?.length,
                              'Сотрудник',
                              '',
                              'а',
                              'ов'
                            )}
                          </div>
                        </div>
                      </div>
                      <DivisionActions
                        division={division}
                        reFetchDepartments={reFetchDepartments}
                      />
                    </div>
                    <UsersList
                      users={division?.users}
                      chefId={division?.chefId}
                    />
                  </Callout>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {divisionIndex === divisions.length - 1 ? null : <Divider />}
          </div>
        );
      })}
    </div>
  );
};
