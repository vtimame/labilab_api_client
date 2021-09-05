import React, { FunctionComponent, useState } from 'react';
import { User } from '../types';
import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/client';
import { DIVISIONS, ROLES } from '../Employees/graphql';
import { MainSection } from './UserEditor/MainSection';
import { Divider, Tab, TabId, Tabs } from '@blueprintjs/core';
import { UserEditorTab } from './UserEditor/UserEditorTab';
import { Section } from './UserEditor/Section';
import { UserPhones } from './UserEditor/UserPhones/UserPhones';
import { UserEmails } from './UserEditor/UserEmails/UserEmails';
import { UserSocialNetworks } from './UserEditor/UserSocialNetworks/UserSocialNetworks';
import { UserMessengers } from './UserEditor/UserMessengers/UserMessengers';
import { UserEmergencyContacts } from './UserEditor/UserEmergencyContacts/UserEmergencyContacts';
import { UserDates } from './UserEditor/UserDates/UserDates';
import { UserDocuments } from './UserDocuments';
import { UserFinance } from './UserEditor/UserFinance/UserFinance';
import { UserPassport } from './UserEditor/UserPassport/UserPassport';
import { UserHolidays } from './UserHolidays/UserHolidays';
import { UserPersonal } from './UserEditor/UserPersonal/UserPersonal';

interface UserEditorProps {
  editableUser: User;
  updateUserMutation: any;
  fetch: Function;
}

const defaultSelectedTab: string = 'main';
export const UserEditor: FunctionComponent<UserEditorProps> = observer(
  ({ editableUser, updateUserMutation, fetch }) => {
    const [user, setUser] = useState(editableUser);
    const [selectedTab, setSelectedTab] = useState<string>(defaultSelectedTab);
    const rolesQuery = useQuery(ROLES);
    const divisionsQuery = useQuery(DIVISIONS);

    return (
      <div>
        <div className="mb-3">
          <MainSection
            user={user}
            setUser={setUser}
            rolesQuery={rolesQuery}
            divisionsQuery={divisionsQuery}
            updateUserMutation={updateUserMutation}
            fetchUser={fetch}
          />
        </div>
        <Tabs
          id="TabsExample"
          onChange={(tab: TabId) => setSelectedTab(tab.toString())}
          selectedTabId={selectedTab}
          renderActiveTabPanelOnly
        >
          <Tab
            id="main"
            title="Основное"
            panel={
              <UserEditorTab>
                <Section
                  openedKeyState={'userEditor.phones'}
                  title="Телефонные номера"
                >
                  <UserPhones userId={user._id} />
                </Section>
                <Divider />
                <Section
                  openedKeyState={'userEditor.emails'}
                  title="Почтовые адреса"
                >
                  <UserEmails userId={user._id} />
                </Section>
                <Divider />
                <Section
                  openedKeyState={'userEditor.socialNetworks'}
                  title="Социальные сети"
                >
                  <UserSocialNetworks userId={user._id} />
                </Section>
                <Divider />
                <Section
                  openedKeyState={'userEditor.messengers'}
                  title="Мессенджеры"
                >
                  <UserMessengers userId={user._id} />
                </Section>
                <Divider />
                <Section
                  openedKeyState={'userEditor.emergencyContacts'}
                  title="Дополнительные контакты"
                >
                  <UserEmergencyContacts userId={user._id} />
                </Section>
                <Divider />
                <Section openedKeyState={'userEditor.dates'} title="Даты">
                  <UserDates
                    user={user}
                    updateUserMutation={updateUserMutation}
                  />
                </Section>
                <Divider />
                <Section
                  openedKeyState={'userEditor.finance'}
                  title="Финансовые"
                >
                  <UserFinance
                    user={user}
                    updateUserMutation={updateUserMutation}
                  />
                </Section>
                <Divider />
                <Section
                  openedKeyState={'userEditor.passport'}
                  title="Паспортные данные"
                >
                  <UserPassport
                    user={user}
                    updateUserMutation={updateUserMutation}
                  />
                </Section>
                <Divider />
                <Section openedKeyState={'userEditor.personal'} title="Личное">
                  <UserPersonal
                    user={user}
                    updateUserMutation={updateUserMutation}
                  />
                </Section>
              </UserEditorTab>
            }
          />
          <Tab
            id="documents"
            title="Документы"
            panel={<UserDocuments userId={user._id} />}
          />
          <Tab
            id="holidays"
            title="Отпуска"
            panel={
              <UserEditorTab>
                <UserHolidays userId={user._id} />
              </UserEditorTab>
            }
          />
          <Tabs.Expander />
          <input
            className="bp3-input"
            type="text"
            placeholder="Поиск..."
            disabled
          />
        </Tabs>
      </div>
    );
  }
);
