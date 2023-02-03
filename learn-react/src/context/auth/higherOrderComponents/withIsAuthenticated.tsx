import * as React from 'react';
import {AuthContextConsumer} from '../AuthContext';
import {doSignOut} from '../../../utils/reducers';

/**
 * @interface withAuthHeaderProps
 */
interface withAuthHeaderProps {
    isAuth: string
}

/**
 * @public
 * @function
 * @name withIsAuthenticated
 * @description Inject Authentication status inside the Component's Prop
 * @param Component
 */
function withIsAuthenticated<P extends withAuthHeaderProps>(
    Component: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          if (c === null) {
            throw new
            Error('Auth Provider is missing. ' +
              'Please add the AuthProvider before Router');
          }
          if (c.authState.auth) {
            if (new Date(c.authState.auth.expiresAt) > new Date()) {
              return <Component {...props} isAuth={true}/>;
            } else {
              c.setAuthState(doSignOut());
              return <Component {...props} isAuth={false}/>;
            }
          } else {
            return <Component {...props} isAuth={false}/>;
          }
        }}
      </AuthContextConsumer>
    );
  };
}

export default withIsAuthenticated;