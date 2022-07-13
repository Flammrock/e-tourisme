/**
 * @Author Lemmy Briot
 */

import React, { useState, useRef } from 'react';
import useLocalStorage from 'use-local-storage';

import { AuthFormProps } from './AuthTypes';
import { SocialIcons, SupportedSocialProvider } from './AuthFederatedSignIn';

import { ListSocialProviders, redirectSignIn } from '@e-tourisme/appsync';
//import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import {
  Authenticator,
  CheckboxField,
  SelectField,
  useAuthenticator,
  Divider,
  Button,
  Flex,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import './AuthStyle.css';

import { IonGrid, IonRow, IonCol } from '@ionic/react';

import { CustomFieldGroup } from '@e-tourisme/data';
import { SelfAssignedGroups, DefaultGroupSelfAssigned } from '@e-tourisme/data';
import { Auth } from 'aws-amplify';

/**
 * @exports
 *
 * AuthForm is a React Component which wrap the original AWS Cognito React Component
 * Authenticator form (from '@aws-amplify/ui-react')
 *
 * If you want to use the original AWS Cognito form use :
 * ```
 * import Authenticator from '@e-tourisme/ui';
 * ```
 *
 * @todo Propagate props.children inside AWS Authenticator
 *
 * @param props AuthFormProps
 * @returns a Authenticator wrapped inside a AuthForm
 */
export function AuthForm(props: AuthFormProps) {
  const [group, setGroup] = useLocalStorage<string | null>('auth:group', null);

  const titleCaseWord = (word: string) => {
    if (!word) return word;
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  };

  const groups = Object.entries(SelfAssignedGroups).map((entry, index) => {
    return (
      <option key={index} value={entry[1]}>
        {entry[0]}
      </option>
    );
  });

  const selectGroupValue = useRef<string>('');

  const socials = (text: string, needGroup: boolean) =>
    ListSocialProviders.map((provider: string, index: number) => {
      const key = titleCaseWord(provider);
      return (
        <Button
          isFullWidth={true}
          onClick={async () => {
            if (!selectGroupValue.current && needGroup) return;
            await Auth.federatedSignIn({
              provider:
                CognitoHostedUIIdentityProvider[
                  key as keyof typeof CognitoHostedUIIdentityProvider
                ],
            });
            if (needGroup) setGroup(selectGroupValue.current);
          }}
          key={`SocialButton-${index}`}
        >
          <>
            {SocialIcons[key.toLowerCase() as SupportedSocialProvider]()}
            <span style={{ marginLeft: '10px' }}>
              {text} {key}
            </span>
          </>
        </Button>
      );
    });

  return (
    <Authenticator
      socialProviders={[]}
      components={{
        SignIn: {
          Header() {
            return <>{socials('Sign In with',false)}</>;
          },
        },
        SignUp: {
          FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
              <IonGrid>
                <IonRow>
                  <SelectField
                    errorMessage={validationErrors[CustomFieldGroup] as string}
                    hasError={!!validationErrors[CustomFieldGroup]}
                    label="Account Type"
                    placeholder="Choose your account type.."
                    name={CustomFieldGroup}
                    onChange={(e) => {
                      selectGroupValue.current = e.target.value;
                    }}
                  >
                    {groups}
                  </SelectField>
                </IonRow>

                <Divider className="ion-hide-lg-up"></Divider>

                <IonRow>
                  <IonCol size="12" sizeLg="5" class="ion-align-items-center">
                    {socials('Sign Up with',true)}
                  </IonCol>
                  <IonCol
                    size="12"
                    class="ion-align-items-center"
                    className="ion-hide-lg-up"
                  >
                    <Divider label="OR"></Divider>
                  </IonCol>
                  <IonCol
                    sizeLg="2"
                    class="ion-align-items-center"
                    className="ion-hide-lg-down"
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Flex
                      direction="row"
                      justifyContent="space-around"
                      style={{ height: '100%' }}
                    >
                      <Divider label="OR" orientation="vertical"></Divider>
                    </Flex>
                  </IonCol>
                  <IonCol size="12" sizeLg="5" class="ion-align-items-center">
                    <Authenticator.SignUp.FormFields />
                  </IonCol>
                </IonRow>

                <Divider className="ion-hide-lg-up"></Divider>

                <CheckboxField
                  errorMessage={validationErrors['acknowledgement'] as string}
                  hasError={!!validationErrors['acknowledgement']}
                  name="acknowledgement"
                  value="yes"
                  label="I agree with the Terms & Conditions"
                />
              </IonGrid>
            );
          },
        },
      }}
      services={{
        async validateCustomSignUp(formData) {
          if (!formData[CustomFieldGroup]) {
            return {
              [CustomFieldGroup]: 'You must choose the type of your account',
              acknowledgement: '',
            };
          }

          if (!formData.acknowledgement) {
            return {
              [CustomFieldGroup]: '',
              acknowledgement: 'You must agree to the Terms & Conditions',
            };
          }
          return;
        },
      }}
    ></Authenticator>
  );
}
/*<IonRow class="ion-align-items-center">
                  <IonCol size="12" sizeMd="5">
                    {socials}
                  </IonCol>
                  <IonCol size="12" className="ion-hide-md-up">
                    <Divider label="OR"></Divider>
                  </IonCol>
                  <IonCol
                    sizeMd="2"
                    className="ion-hide-md-down"
                    style={{ height: '100%' }}
                  >
                    <Flex direction="row" justifyContent="space-around" style={{ height: '100%' }}>
                      <Divider label="OR" orientation="vertical"></Divider>
                    </Flex>
                  </IonCol>
                  <IonCol size="12" sizeMd="5">
                    <Authenticator.SignUp.FormFields />
                  </IonCol>
                </IonRow>*/
