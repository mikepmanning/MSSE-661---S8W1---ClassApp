const AUTH_API = `${BASE_API_URL}/auth`;
const USER_API = `${BASE_API_URL}/user`;

const register = (formData) => {
    return _post(`${AUTH_API}/register`, formData);
}

const login = (formData) => {
    const response = _post(`${AUTH_API}/login`, formData);
    return response;
}

const logout = () => {
    clearStorage('isAuth');
    clearStorage('access_token');
    clearStorage('refresh_token');
    
    window.location.href = "index.html";
}