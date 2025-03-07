const AUTH_API = `${BASE_API_URL}/auth`;

class AuthService {
    register = (formData) => {
        return _post(`${AUTH_API}/register`, formData);
    }

    login = (formData) => {
        const response = _post(`${AUTH_API}/login`, formData);
        return response;
    }

    logout = () => {
        clearStorage('isAuth');
        clearStorage('access_token');
        clearStorage('refresh_token');
        
        window.location.href = "../index.html";
    }

}

const authService = new AuthService();