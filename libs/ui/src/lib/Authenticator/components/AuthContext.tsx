/**
 * @Author Lemmy Briot
 */

import React from 'react';
import { AuthSession, DefaultAuthSession } from './AuthTypes';

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
export const AuthContext = React.createContext<AuthSession>(DefaultAuthSession);
