/** 
 * @providesModule Actions 
 */

import * as hello from './hello';
import * as user from './user';
import * as circular from './circular';
import * as accusation from './accusation';
import * as exposure from './exposure';
import * as system from './system';

export default {
  ...hello,
  ...user,
  ...circular,
  ...accusation,
  ...exposure,
  ...system,
};