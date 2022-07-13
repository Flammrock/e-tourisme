/**
 * @Author Lemmy Briot
 */

import React from 'react';
import { AuthSession, AuthState, AuthProps } from './AuthTypes';
import { AuthContext } from './AuthContext';

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
