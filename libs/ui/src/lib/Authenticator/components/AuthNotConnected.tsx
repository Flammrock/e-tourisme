/**
 * @Author Lemmy Briot
 */

import React from 'react';
import { AuthSession, AuthState, AuthProps } from './AuthTypes';
import { AuthContext } from './AuthContext';

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
