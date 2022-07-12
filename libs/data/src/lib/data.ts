export function data(): string {
  return 'data';
};



/**
 * @exports
 *
 */
 export interface User {
  id: string;
  name: string;
  email: string;
  group: string;
};

/**
 * @exports
 * 
 */
export const CustomFieldGroup = 'custom:group';

/**
 * @exports
 * 
 * List of all available groups (Cognito groups)
 * 
 * @info value must correspond to the real existing group name
 */
export const Groups = {
  Admins: 'admins',
  Partners: 'partners',
  Contributors: 'contributors',
  Tourists: 'tourists',
};

/**
 * @exports
 * 
 * List of all available groups that a user can assign themselves from the registration form
 * 
 * @info value must correspond to the real existing group name
 * This is actually used by the React Component \<AuthForm\>\<\/AuthForm\> to display the list of groups
 */
export const SelfAssignedGroups = {
  Partners: 'partners',
  Contributors: 'contributors',
  Tourists: 'tourists'
};

/**
 * @exports
 */
export const DefaultGroupSelfAssigned = SelfAssignedGroups.Tourists;
