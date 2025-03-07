const USER_API = `${BASE_API_URL}/user`;

class UserService {

    getCurrentUser = () => {
        const response = _get(`${USER_API}/me`)
        .catch(function(error) { 
            console.error("Failed getting user", error);
            return null;
        });
    
            return response;
    }

    updateUser = (user) => {
        return _put(`${USER_API}/${user.id}`, user);
    };
}

const userService = new UserService();