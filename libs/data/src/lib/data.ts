export function data(): string {
  return 'data';
}

export type Group = 'admins' | 'partners' | 'contributors' | 'tourists';

/**
 * @exports
 *
 * List of all available groups (Cognito groups)
 *
 * @info value must correspond to the real existing group name
 */
 export const Groups = {
  Admins: 'admins' as Group,
  Partners: 'partners' as Group,
  Contributors: 'contributors' as Group,
  Tourists: 'tourists' as Group,
};


/**
 * @exports
 *
 * List of all available groups that a user can assign themselves from the registration form
 *
 * @info value must correspond to the real existing group name
 * This is actually used by the React Component \<AuthForm\>\<\/AuthForm\> to display the list of groups
 */
export const SelfAssignedGroups: { [key: string]: Group } = {
  Partners: 'partners',
  Contributors: 'contributors',
  Tourists: 'tourists',
};

export type SnowFlake = string;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResolvableEntity {}

/**
 * @exports
 *
 */
export interface UserData {
  id: SnowFlake;
  name: string;
  email: string;
  group: Group;
}
