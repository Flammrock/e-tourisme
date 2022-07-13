/**
 * @Author Lemmy Briot
 */

import { User } from '@e-tourisme/data';

/**
 * @exports
 *
 */
/* eslint-disable-next-line */
export interface AuthFormProps {}

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
export const DefaultAuthSession: AuthSession = {
  user: {} as User,
  state: AuthState.LOADING,
  signOut: () => null,
};



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
