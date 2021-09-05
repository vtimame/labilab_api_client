import React, { FunctionComponent } from 'react';
import { Callout, Classes, Divider } from '@blueprintjs/core';
import { DivisionsList } from './DivisionsList';
import { observer } from 'mobx-react-lite';
import { DepartmentActions } from './DepartmentsList/DepartmentsAction';
import { Department } from '../types';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './graphql';
import { useDepartmentsQuery } from './EmployeesPage';
import dW from 'decline-word';

interface DepartmentsListProps {
  departments: Department[];
  reFetchDepartments: Function;
}

export const DepartmentsList: FunctionComponent<DepartmentsListProps> = observer(
  ({ departments, reFetchDepartments }) => {
    const { refetch } = useDepartmentsQuery();
    const [updateUser] = useMutation(UPDATE_USER);

    const onDrop = async ({
      source,
      destination,
      draggableId,
    }: DropResult): Promise<void> => {
      if (source.droppableId !== destination?.droppableId) {
        await updateUser({
          variables: {
            payload: { _id: draggableId, divisionId: destination?.droppableId },
          },
        });
        await refetch();
      }
    };

    return (
      <DragDropContext onDragEnd={() => {}} onDragUpdate={onDrop}>
        {departments.map((department, departmentIndex) => {
          return (
            <div key={department._id}>
              <Callout>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="ml-2 d-flex align-items-center">
                    <div style={{ fontWeight: 600 }}>{department.name}</div>
                    <div>&nbsp;-&nbsp;</div>
                    <div
                      className={`${Classes.TEXT_MUTED} d-flex`}
                      style={{ fontSize: '13px' }}
                    >
                      <div>
                        {department?.divisions?.length}{' '}
                        {dW(
                          department?.divisions?.length,
                          'Отдел',
                          '',
                          'а',
                          'ов'
                        )}
                      </div>
                    </div>
                  </div>
                  <DepartmentActions
                    department={department}
                    reFetchDepartments={reFetchDepartments}
                  />
                </div>
                <div className="mt-2">
                  <DivisionsList
                    divisions={department.divisions}
                    reFetchDepartments={reFetchDepartments}
                  />
                </div>
              </Callout>
              {departmentIndex === departments.length - 1 ? null : <Divider />}
            </div>
          );
        })}
      </DragDropContext>
    );
  }
);
