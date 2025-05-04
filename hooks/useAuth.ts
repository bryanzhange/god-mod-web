import { useRouter } from 'next/navigation'
import { setUser } from 'stores/slice/authSlice'
import { showLoading, hideLoading } from 'stores/slice/pageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'stores'
import * as authApi from '@/api/auth'

const useAuth = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const isAuthenticated = !!user;

    const login = async (user: authApi.TelegramAuthParams) => {
        dispatch(showLoading());
        try {
            const response = await authApi.login(user);
            if (response) {
                dispatch(setUser({ ...response }));
                sessionStorage.setItem('auth_token', JSON.stringify(response)); // For demo only - BE should set cookie
            }
            dispatch(hideLoading());
            return !!response;
        }
        catch (error) {
            dispatch(hideLoading());
            return false;
        }
    }

    const logout = async () => {
        dispatch(showLoading());
        try {
            sessionStorage.removeItem('auth_token');
            await authApi.signOut();
            router.replace('/');
            dispatch(setUser(null));
            dispatch(hideLoading());
        }
        catch (error) {
            dispatch(hideLoading());
            throw error;
        }
    }

    const auth = async () => {
        const user = await authApi.auth()
        dispatch(setUser(user))
    }

    return {
        login,
        logout,
        auth,
        isAuthenticated,
        user
    }
}

export default useAuth;
