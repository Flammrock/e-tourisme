import React, { useState, useEffect } from 'react';

import { AppSyncModule } from '@e-tourisme/appsync';
import { Auth, Hub } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

new AppSyncModule();

/**
 * @exports
 *
 */
export interface User {
  name: string;
  email: string;
}

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
 */
export interface AuthSession {
  user: User | null;
  state: AuthState;
  signOut: () => void;
}

/**
 * defaultAuthSession correspond to the default auth session object when the
 * Authentication System has not been initialized yet
 */
const defaultAuthSession: AuthSession = {
  user: null,
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
 * 
 * 
 * @param children 
 * @param fn 
 * @returns 
 */
function recursiveMap(
  children: React.ReactNode | readonly React.ReactNode[],
  fn: (child: React.ReactNode) => React.ReactNode
):
  | (
      | string
      | number
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
    )[]
  | null
  | undefined {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (typeof child.props.children === 'object') {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn),
      });
    }
    return fn(child);
  });
}

/**
 * @exports
 *
 */
export interface AuthProps {
  children: React.ReactNode | React.ReactNode[];
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
  return <Authenticator></Authenticator>;
}

/**
 * @warning use AuthForm instead
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
  return (
    <>
      {props.children}
      <div />
    </>
  );
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
  return (
    <AuthContext.Consumer>
      {(session) => {
        return props.children(session);
      }}
    </AuthContext.Consumer>
  );
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
  return (
    <>
      {props.children}
      <div />
    </>
  );
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
export function AuthContainer(props: AuthProps) {
  const [session, setSession] = useState<AuthSession>(defaultAuthSession);
  useEffect(() => {
    const updateSession = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log('CONNECTED!');
        setSession({
          user: user.attributes as User,
          state: AuthState.CONNECTED,
          signOut: async () => {
            await Auth.signOut();
          },
        });
      } catch {
        console.log('NOT CONNECTED!');
        setSession({
          user: null,
          state: AuthState.NOT_CONNECTED,
          signOut: () => null,
        });
      }
    };
    console.log('LOADING!');
    Hub.listen('auth', updateSession);
    updateSession();
    return () => Hub.remove('auth', updateSession);
  }, []);

  const children = recursiveMap(props.children, (child) => {
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
  });

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}
