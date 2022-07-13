/**
 * @Author Lemmy Briot
 */

import React from 'react';
import { AuthSession,AuthState,AuthConnectedProps } from './AuthTypes';
import { AuthContext } from './AuthContext';

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
