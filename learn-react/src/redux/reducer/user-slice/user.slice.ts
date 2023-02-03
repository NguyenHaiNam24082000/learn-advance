import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import authApi from "../../../api/authApi";

export const USER_FEATURE_KEY = "user";

/*
 * Update these interfaces according to your requirements.
 */
export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  otp_enabled: string;
}

export interface UserState extends EntityState<IUserEntity> {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  isLoading: boolean;
  error?: string | null;
}

export const userAdapter = createEntityAdapter<IUserEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchUser())
 * }, [dispatch]);
 * ```
 */
export const fetchUser = createAsyncThunk(
  "user/fetchStatus",
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getUsers()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialUserState: UserState = userAdapter.getInitialState({
  loadingStatus: "not loaded",
  isLoading: false,
  error: null,
});

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {
    add: userAdapter.addOne,
    remove: userAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state: UserState) => {
        state.loadingStatus = "loading";
        state.isLoading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state: UserState, action: PayloadAction<IUserEntity[]>) => {
          userAdapter.setAll(state, action.payload);
          state.loadingStatus = "loaded";
          state.isLoading = false;
        }
      )
      .addCase(fetchUser.rejected, (state: UserState, action) => {
        state.loadingStatus = "error";
        state.isLoading = false;
        state.error = action.error.message;
      });

    
  },
});

/*
 * Export reducer for store configuration.
 */
export const userReducer = userSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(userActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const userActions = userSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllUser);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = userAdapter.getSelectors();

export const getUserState = (rootState: unknown): UserState =>
  rootState[USER_FEATURE_KEY];

export const selectAllUser = createSelector(getUserState, selectAll);

export const selectUserEntities = createSelector(getUserState, selectEntities);
