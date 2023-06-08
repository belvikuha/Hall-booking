export const getAuth = state => state.user.isAuth
export const getUserId = state => state.user.currentUser.id
export const getLoading = state => state.user.loading
export const getToken = state => state.user.token
export const getCurrentUser = state => state.user.currentUser

