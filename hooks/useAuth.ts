import { useRouter } from 'next/navigation'
import { setUser, setRememberMe, User } from 'stores/slice/authSlice'
import { showLoading, hideLoading } from 'stores/slice/pageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'stores'

const signIn = async (email: string, password: string) => {
    if (email === 'godmod@gmail.com' && password === '123456') {
        return { email, password, role: 'admin' }
    }
    if (email === 'test@gmail.com' && password === '123456') {
        return { email, password, role: 'user' }
    }
    return null
}

const signOut = async () => {

}

const useAuth = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const role = user?.role; // for demo only
    const isAuthenticated = !!user;

    const login = async (email: string, password: string, rememberMe: boolean = false) => {
        dispatch(showLoading());
        try {
            dispatch(setRememberMe(rememberMe));
            const response = await signIn(email, password);
            if (response) {
                dispatch(setUser({ ...response }));
                sessionStorage.setItem('auth_token', JSON.stringify(response)); // for demo only
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
            await signOut();
            router.replace('/');
            dispatch(setUser(null));
            dispatch(hideLoading());
        }
        catch (error) {
            dispatch(hideLoading());
            throw error;
        }
    }

    const auth = () => new Promise<User | null>((resolve, reject) => {
        //fetch('/api/me')
        const token = sessionStorage.getItem('auth_token');
        if (token) {
            dispatch(setUser(JSON.parse(token)))
        }
    })

    return {
        login,
        logout,
        auth,
        isAuthenticated,
        user,
        role
    }
}

export default useAuth;
