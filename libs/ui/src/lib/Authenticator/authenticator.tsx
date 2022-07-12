/**
 * @Author Lemmy Briot
 */


import React, { useState, useEffect } from 'react';

import { AppSyncModule } from '@e-tourisme/appsync';
import { Auth, Hub } from 'aws-amplify';
import {
  Authenticator,
  CheckboxField,
  SelectField,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { User, CustomFieldGroup } from '@e-tourisme/data';
import { SelfAssignedGroups, DefaultGroupSelfAssigned } from '@e-tourisme/data';

// TODO: upgrade the design of the appsync lib
new AppSyncModule();

/**
 * @exports
 *
 * Internal state Auth enum that describe the current state of the Authentication System
 *
 * - LOADING: Authentication System has not yet retrieve the current user from the backend,
 *            it's mean that, we wait the response from the backend to decide if the user is
 *            connected or not (the Authentication System use cookies behaviour to create a
 *            session's token that is valid during a specific time period which the user keep
 *            connected)
 *
 * - CONNECTED: Authentication System have sent a response with the user data, it's mean that
 *              the user successfully connected through our Authentication System (Cognito).
 *              This Authenticator React Lib use React.createContext to provide the user data
 *              into functionnal react consumers which are : AuthConnected, AuthHasPermission
 *              and AuthHasNotPermission.
 *
 * - NOT_CONNECTED: Authentication System has fail to retrieve the current user through cookies
 *                  or via the AuthForm (which need user's interactions to initialize the
 *                  connection). It's mean that maybe the session's token has been deleted
 *                  (using signOut button) or expired or the user never authenticate itself
 *                  using a AuthForm react component.
 *
 * @summary Internal state Auth enum that describe the current state of the Authentication System
 *
 * @readonly
 * @enum {number}
 */
export enum AuthState {
  LOADING,
  CONNECTED,
  NOT_CONNECTED,
}

/**
 * @exports
 *
 * ```
 * export interface AuthSession {
 *   user: User;           // An object that implement the
 *                         // User interface defined in '@e-tourisme/data'
 * 
 * 
 *   state: AuthState;     // see the enum AuthState
 * 
 * 
 *   signOut: () => void;  // If the User is connected, this function is 
 *                         // has the consequence of disconnecting the user
 *                         // and updating the authentication context
 * }
 * ```
 * 
 * @info The `AuthContext` is created in the AuthContainer React Component
 * 
 * An AuthSession is the most important interface, all components defined here communicate with
 * each other by using the new concept of React : React Context
 * 
 * Some explanatory links:
 * - https://fr.reactjs.org/docs/context.html
 * - https://www.freecodecamp.org/news/react-context-for-beginners/
 * - https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * 
 * @tutorial
 * An `AuthContext` is created (lower in this file) like this :
 * ```
 * export const AuthContext = React.createContext<AuthSession>(defaultAuthSession);
 * ```
 * 
 * Then, we can create a React Component that provide an `AuthSession` like this :
 * ```
 * const session: AuthSession = {} as AuthSession;
 * <AuthContext.Provider value={session}>
 *   {props.children}
 * </AuthContext.Provider>
 * ```
 * 
 * In this case, we can retrieve the `AuthSession` in each AuthContext.Consumer like this :
 * ```
 * <AuthContext.Consumer>
 *   {(session) => (
 *     <>
 *       We can access data user like that, your email is : {session.user.email}
 *     </>
 *   )}
 * </AuthContext.Consumer>
 * ```
 */
export interface AuthSession {

  /**
   * An object that implement the
   * User interface defined in '@e-tourisme/data'
   */
  user: User;

  /**
   * Define the internal state of the authentication context which can be :
   * - LOADING
   * - CONNECTED
   * - NOT_CONNECTED
   * 
   * @see AuthState
   */
  state: AuthState;

  /**
   * If the User is connected, this function is 
   * has the consequence of disconnecting the user
   * and updating the authentication context
   */
  signOut: () => void;
}

/**
 * defaultAuthSession correspond to the default auth session object when the
 * Authentication System has not been initialized yet
 */
const defaultAuthSession: AuthSession = {
  user: {} as User,
  state: AuthState.LOADING,
  signOut: () => null,
};

/**
 * @exports
 *
 * AuthContext is a React Context that help to propagate user data into React Consumer
 * Components from React Provider Component
 *
 * @warning You may not use this if you don't know how it work (see tutorial about react context)
 * And if you use this, you should never use \<AuthContext.Provider\>\<\/AuthContext.Provider\>,
 * see the AuthContainer React Component to see how the Component interact with the AWS Cognito
 *
 * @example
 * Use this to create your own React Consumer Component :
 * ```
 * export function MyAuthComponent(props: MyAuthComponentProps) {
 *   return (
 *     <AuthContext.Consumer>
 *       {(session) => (
 *         <>
 *           ..CODE HERE..
 *         </>
 *       )}
 *     </AuthContext.Consumer>
 *   }
 * );
 * ```
 */
export const AuthContext = React.createContext<AuthSession>(defaultAuthSession);


/**
 * @exports
 * @interface
 * 
 * Any Component like AuthContainer, AuthConnected, etc... will render
 * all of these children according to specific conditions
 * 
 * <strong>The component AuthForm and AuthConnected are the only exceptions</strong>
 */
export interface AuthProps {
  children: React.ReactNode | React.ReactNode[];
}

/**
 * @exports
 *
 */
export interface AuthContainerProps extends AuthProps {
  onSignUp?: (user: User) => void;
  onSignIn?: (user: User) => void;
  onSignOut?: (user: User) => void;
}

/**
 * @exports
 *
 */
export interface AuthConnectedProps {
  children(session: AuthSession): React.ReactNode | React.ReactNode[];
}

/**
 * @exports
 *
 */
export interface AuthPermissionProps extends AuthProps {
  group: string | string[];
}

/**
 * @exports
 *
 */
/* eslint-disable-next-line */
export interface AuthFormProps {}

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

  const [group, setGroup] = useState<string>(DefaultGroupSelfAssigned);

  return (
    <Authenticator
      components={{
        SignUp: {
          FormFields() {
            const { validationErrors } = useAuthenticator();

            const groups = Object.entries(SelfAssignedGroups).map((entry,index) => {
              return <option key={index} value={entry[1]}>{entry[0]}</option>;
            });

            return (
              <>
                <Authenticator.SignUp.FormFields />

                <SelectField
                  label="Account Type"
                  value={group}
                  name={CustomFieldGroup}
                  onChange={(e) => {setGroup(e.target.value)}}
                >
                  {groups}
                </SelectField>

                {/* Append & require Terms & Conditions field to sign up  */}
                <CheckboxField
                  errorMessage={validationErrors['acknowledgement'] as string}
                  hasError={!!validationErrors['acknowledgement']}
                  name="acknowledgement"
                  value="yes"
                  label="I agree with the Terms & Conditions"
                />
              </>
            );
          },
        },
      }}
      services={{
        async validateCustomSignUp(formData) {
          if (!formData.acknowledgement) {
            return {
              acknowledgement: 'You must agree to the Terms & Conditions',
            };
          }
          return;
        },
      }}
    ></Authenticator>
  );
}

/**
 * @deprecated use AuthForm instead
 */
export default Authenticator;

/**
 * @exports
 *
 * AuthLoading is a React Component which is rendered ONLY if the user is logging in
 * (Authentication System didn't answer yet) through the Authentication System (Cognito)
 *
 * @warning This Component must has \<AuthContainer\>\<\/AuthContainer\> as parent
 *
 * @example
 * Example of use :
 * ```
 * import { AuthContainer, AuthLoading } from '@e-tourisme/ui';
 *
 * <AuthContainer>
 *   <AuthLoading>
 *     loading..
 *   </AuthLoading>
 * </AuthContainer>
 * ```
 *
 * @param props AuthProps
 * @returns a AuthLoading React component
 */
export function AuthLoading(props: AuthProps) {
  const internalBuild = (session: AuthSession): React.ReactNode => {
    if (session.state !== AuthState.LOADING) return;
    return props.children;
  };

  return <AuthContext.Consumer>{internalBuild}</AuthContext.Consumer>;
}

/**
 * @exports
 *
 * AuthConnected is a React Component which is rendered ONLY if
 * the user is connected through the Authentication System (Cognito)
 *
 * @warning This Component must has \<AuthContainer\>\<\/AuthContainer\> as parent
 *
 * @example
 * Example of use :
 * ```
 * import { AuthContainer, AuthConnected } from '@e-tourisme/ui';
 *
 * <AuthContainer>
 *   <AuthConnected>
 *     {(session) => (
 *       <>
 *         You are connected {session.user.name}!
 *         <button onClick={session.signOut}>Sign Out</button>
 *       </>
 *     )}
 *   </AuthConnected>
 * </AuthContainer>
 * ```
 *
 * @param props AuthConnectedProps
 * @returns a AuthConnected React component
 */
export function AuthConnected(props: AuthConnectedProps) {
  const internalBuild = (session: AuthSession): React.ReactNode => {
    if (session.state !== AuthState.CONNECTED) return;
    return props.children(session);
  };

  return <AuthContext.Consumer>{internalBuild}</AuthContext.Consumer>;
}

/**
 * @exports
 *
 * AuthConnected is a React Component which is rendered ONLY if
 * the user is NOT connected through the Authentication System (Cognito)
 *
 * @warning This Component must has \<AuthContainer\>\<\/AuthContainer\> as parent
 *
 * @example
 * Example of use :
 * ```
 * import { AuthContainer, AuthNotConnected, AuthForm } from '@e-tourisme/ui';
 *
 * <AuthContainer>
 *   <AuthNotConnected>
 *     <span>You are not connected! Please connect into your account with this form:</span>
 *     <AuthForm></AuthForm>
 *   </AuthNotConnected>
 * </AuthContainer>
 * ```
 *
 * @param props AuthProps
 * @returns a AuthNotConnected React component
 */
export function AuthNotConnected(props: AuthProps) {
  const internalBuild = (session: AuthSession): React.ReactNode => {
    if (session.state !== AuthState.NOT_CONNECTED) return;
    return props.children;
  };

  return <AuthContext.Consumer>{internalBuild}</AuthContext.Consumer>;
}

/**
 * @exports
 *
 * AuthHasPermission is a React Component which is rendered ONLY if
 * the current user belongs to the group(s) specified by the props.group attribute
 *
 * @warning This Component must has \<AuthConnected\>\<\/AuthConnected\> as parent
 *
 * @see AuthHasNoPermission if you want to do the opposite
 *
 * @example
 * If the current user is member of the group : `Partner`, he will see this :
 * ```
 * <AuthContainer>
 *   <AuthConnected>
 *     {(session) => (
 *       <AuthHasPermission group="partners">
 *         {session.user.name}, you are member of the group Partner!
 *       </AuthHasPermission>
 *     )}
 *   </AuthConnected>
 * </AuthContainer>
 * ```
 *
 * You can also do that :
 * ```
 * <AuthContainer>
 *   <AuthConnected>
 *     {(session) => (
 *       <>
 *         <AuthHasPermission group={["partners","contributors"]}>
 *           {session.user.name}, you are member of the group Partner or Contributor!
 *           It's mean that a Tourist or an Admin can't see this
 *         </AuthHasPermission>
 *         <AuthHasPermission group={["admins"]}>
 *           {session.user.name}, you are an admin!
 *         </AuthHasPermission>
 *       </>
 *     )}
 *   </AuthConnected>
 * </AuthContainer>
 * ```
 *
 * @param props AuthPermissionProps
 * @returns a AuthHasPermission React component
 */
export function AuthHasPermission(props: AuthPermissionProps) {
  const groups = Array.isArray(props.group) ? props.group : [props.group];

  const internalBuild = (session: AuthSession): React.ReactNode => {
    if (session.state !== AuthState.CONNECTED) return;
    if (!groups.includes(session.user.group)) return;
    return props.children;
  };

  return <AuthContext.Consumer>{internalBuild}</AuthContext.Consumer>;
}

/**
 * @exports
 *
 * AuthHasNoPermission is a React Component which is rendered ONLY if
 * the current user belongs to the group(s) specified by the props.group attribute
 *
 * @warning This Component must has \<AuthConnected\>\<\/AuthConnected\> as parent
 *
 * @see AuthHasPermission if you want to do the opposite
 *
 * @example
 * If the current user is member of the group : `Partner`, he will see this :
 * ```
 * <AuthContainer>
 *   <AuthConnected>
 *     {(session) => (
 *       <AuthHasNoPermission group="partners">
 *         {session.user.name}, you are NOT member of the group Partner!
 *       </AuthHasNoPermission>
 *     )}
 *   </AuthConnected>
 * </AuthContainer>
 * ```
 *
 * You can also do that :
 * ```
 * <AuthContainer>
 *   <AuthConnected>
 *     {(session) => (
 *       <>
 *         <AuthHasNoPermission group={["partners","contributors"]}>
 *           {session.user.name}, you are NOT member of the group Partner and NOT member of the group Contributor!
 *           It's mean that a Tourist or an Admin can see this
 *         </AuthHasNoPermission>
 *         <AuthHasNoPermission group={["admins"]}>
 *           {session.user.name}, you are NOT an admin!
 *         </AuthHasNoPermission>
 *       </>
 *     )}
 *   </AuthConnected>
 * </AuthContainer>
 * ```
 *
 * @param props AuthPermissionProps
 * @returns a AuthHasNoPermission React component
 */
export function AuthHasNoPermission(props: AuthPermissionProps) {
  const groups = Array.isArray(props.group) ? props.group : [props.group];

  const internalBuild = (session: AuthSession): React.ReactNode => {
    if (session.state !== AuthState.CONNECTED) return;
    if (groups.includes(session.user.group)) return;
    return props.children;
  };

  return <AuthContext.Consumer>{internalBuild}</AuthContext.Consumer>;
}

/**
 * @exports
 *
 * @example
 * Example of use :
 * ```
 * import {
 *   AuthConnected,
 *   AuthContainer,
 *   AuthLoading,
 *   AuthNotConnected,
 *   AuthForm,
 * } from '@e-tourisme/ui';
 *
 * export function Home() {
 *   return (
 *     <AuthContainer>
 *       <div>Hi!</div>
 *       <AuthLoading>Please wait, we are querying the backend</AuthLoading>
 *       <div style={{ background: 'red' }}>
 *         <AuthConnected>
 *           {(session) => (
 *             <>
 *               You are connected {session.user.name}
 *               <button onClick={session.signOut}>Sign Out</button>
 *             </>
 *           )}
 *         </AuthConnected>
 *       </div>
 *       <AuthNotConnected>
 *         <span>You are not connected! Please connect into your account with this form:</span>
 *         <AuthForm></AuthForm>
 *       </AuthNotConnected>
 *     </AuthContainer>
 *   );
 * }
 *
 * export default Home;
 * ```
 *
 * @param props
 * @returns
 */
export function AuthContainer(props: AuthContainerProps) {
  const [session, setSession] = useState<AuthSession>(defaultAuthSession);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateSession = async (data: any | null) => {
      if (
        data != null &&
        data.payload.event === 'signUp' &&
        typeof props.onSignUp === 'function'
      ) {
        props.onSignUp(data.payload.data.attributes);
      }
      if (
        data != null &&
        data.payload.event === 'signIn' &&
        typeof props.onSignIn === 'function'
      ) {
        props.onSignIn(data.payload.data.attributes);
      }
      if (
        data != null &&
        data.payload.event === 'signOut' &&
        typeof props.onSignOut === 'function'
      ) {
        props.onSignOut(data.payload.data.attributes);
      }

      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        console.log(cognitoUser);
        const user: User = {
          id: cognitoUser.attributes.sub,
          name: cognitoUser.attributes.name,
          email: cognitoUser.attributes.email,
          group: cognitoUser.attributes[CustomFieldGroup]
        };
        console.log('CONNECTED!');
        setSession({
          user: user,
          state: AuthState.CONNECTED,
          signOut: async () => {
            await Auth.signOut();
          },
        });
      } catch {
        console.log('NOT CONNECTED!');
        setSession({
          user: {} as User,
          state: AuthState.NOT_CONNECTED,
          signOut: () => null,
        });
      }
    };
    console.log('LOADING!');
    Hub.listen('auth', updateSession);
    updateSession(null);
    return () => Hub.remove('auth', updateSession);
  }, [props]);

  /*const children = recursiveMap(props.children, (child) => {
    if (typeof child === 'object') {
      const el = child as JSX.Element;
      if (typeof el === 'undefined' || el === null) return child;
      if (el.type === AuthLoading) {
        return session.state === AuthState.LOADING ? child : null;
      } else if (el.type === AuthConnected) {
        return session.state === AuthState.CONNECTED ? child : null;
      } else if (el.type === AuthNotConnected) {
        return session.state === AuthState.NOT_CONNECTED ? child : null;
      }
    }
    return child;
  });*/

  return (
    <AuthContext.Provider value={session}>{props.children}</AuthContext.Provider>
  );
}
