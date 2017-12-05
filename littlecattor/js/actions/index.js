/** 
 * @providesModule Actions 
 */

import * as hello from './hello';
import * as user from './user';
import * as circular from './circular';

export default {
  ...hello,
  ...user,
  ...circular,
};