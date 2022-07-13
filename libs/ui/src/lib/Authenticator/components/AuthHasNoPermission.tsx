/**
 * @Author Lemmy Briot
 */

import React from 'react';
import { AuthSession, AuthState, AuthPermissionProps } from './AuthTypes';
import { AuthContext } from './AuthContext';

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
