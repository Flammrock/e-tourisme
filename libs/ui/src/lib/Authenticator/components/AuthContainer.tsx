/**
 * @Author Lemmy Briot
 */

import React, { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import {
  AuthSession,
  AuthState,
  AuthContainerProps,
  DefaultAuthSession,
} from './AuthTypes';
import { AuthContext } from './AuthContext';
import { User, Hub, Group } from '@e-tourisme/core';

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
  const [session, setSession] = useState<AuthSession>(DefaultAuthSession);
  const [group, setGroup] = useLocalStorage<string|null>('auth:group', null);


  useEffect(() => {
    const updateAttributes = async () => {
      const user = await User.fetch();
      await user.setGroup(group as Group);
      setGroup(null);
    };
    if (group != null) {
      updateAttributes();
    }
  }, [group, props, setGroup]);


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
      // TODO
      
      try {

        const user = await User.fetch();
        console.log('CONNECTED!');
        setSession({
          user: user,
          state: AuthState.CONNECTED
        });
      } catch {
        console.log('NOT CONNECTED!');
        setSession({
          user: {} as User,
          state: AuthState.NOT_CONNECTED
        });
      }
    };
    console.log('LOADING!');
    Hub.listen('auth', updateSession);
    updateSession(null);
    return () => Hub.remove('auth', updateSession);
  },[]); // TODO

  return (
    <AuthContext.Provider value={session}>
      {props.children}
    </AuthContext.Provider>
  );
}
