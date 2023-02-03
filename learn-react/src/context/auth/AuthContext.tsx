import React, { Dispatch, SetStateAction } from "react";
import {AuthContextInterface} from '../../types';

const AuthContext = React.createContext<AuthContextInterface | null>(null);

const AuthContextConsumer = AuthContext.Consumer;
export {AuthContext, AuthContextConsumer};