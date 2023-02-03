import * as React from 'react';
import {AuthContextConsumer} from '../AuthContext';
import {AuthStateUserObject} from '../../../types';

/**
 * @interface withAuthProps
 */
interface withAuthProps {
    authState: AuthStateUserObject| null
}

/**
 * @function
 * @name withAuthUser
 * @description Inject Authenticated User's state inside the Component's Prop
 * @param Component
 */
function withAuthUser<P extends withAuthProps>(
    Component: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return (props: P)=>{
    return (
      <AuthContextConsumer>
        {(context) => {
          if (context === null) {
            throw new
            Error('Auth Provider is missing. ' +
              'Please add the AuthProvider before Router');
          }
          if (context.authState.auth) {
            return (
              <Component {...props} authState={context.authState.userState}/>
            );
          } else {
            return (
              <Component {...props} authState={null}/>
            );
          }
        }}
      </AuthContextConsumer>
    );
  };
}
/**
 * @exports withAuthUser
 */
export default withAuthUser;