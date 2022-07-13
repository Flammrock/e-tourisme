/**
 * @Author Lemmy Briot
 */

import React from 'react';
import { AuthSession, AuthState, AuthPermissionProps } from './AuthTypes';
import { AuthContext } from './AuthContext';

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
