const updateUserModal = document.getElementById("updateUserModal");
const modalOverlay = document.getElementById("modalOverlay");

class User {
    constructor(userService) {
        this.userService = userService;
    }


    displayUpdateUserModel = async (event) => {
        event.preventDefault();

        
        const user = await this._getCurrentUser();
        if (user == null) {
            return;
        }

        const userId = document.getElementById('update-userId');
        const firstName = document.getElementById('update-firstname');
        const middleName = document.getElementById('update-middlename');
        const lastName = document.getElementById('update-lastname');
        const username = document.getElementById('update-username');
        const email = document.getElementById('update-email');

        userId.value = user._id;
        firstName.value = user.firstName;
        middleName.value = user.middleName;
        lastName.value = user.lastName;
        username.value = user.username;
        email.value = user.email;
        
        const birthdate = new Date(user.birthdate);
        const year = birthdate.getUTCFullYear();
        const month = ('0' + (birthdate.getUTCMonth() + 1)).slice(-2); 
        const day = ('0' + birthdate.getUTCDate()).slice(-2);
        const formattedBirthdate = `${year}-${month}-${day}`;

        document.getElementById('update-birthdate').value = formattedBirthdate;


        updateUserModal.style.display = 'block';
        modalOverlay.style.display = 'block';

    }

    _getCurrentUser = () => {
        try{
            return this.userService.getCurrentUser();
        } catch {
            console.log("Error getting current user");
            return null;
        }
    }

    hideModal = () => {
        updateUserModal.style.display = 'none';
        modalOverlay.style.display = 'none';
    }

    
    _updateUser = (user) => {
        return this.userService.updateUser(user);
    }

    updateUser = (event) => {
        console.log("Entering updateUser");
        event.preventDefault();
        const oldPassword = document.getElementById('update-old-password').value;
      
        if (oldPassword === '') {
          alert("Please enter your old password");
          return;
        }
      
        const newUserData = {
          id: document.getElementById('update-userId').value,
          firstName: document.getElementById('update-firstname').value,
          middleName: document.getElementById('update-middlename').value,
          lastName: document.getElementById('update-lastname').value,
          username: document.getElementById('update-username').value,
          email: document.getElementById('update-email').value,
          birthdate: document.getElementById('update-birthdate').value,
          oldPassword: oldPassword,
          newPassword: document.getElementById('update-new-password').value
        }
      
        this._updateUser(newUserData)
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then(data => {
          console.log('Update successful:', data);
          if (data.success) {
            alert("Updated User Successfully")
          }      
          updateUserModal.style.display = 'none';
          modalOverlay.style.display = 'none';
        })
        .catch(error => {
          console.error('Updating error:', error);
          error.json().then(errorData => {
            if (errorData && errorData.error) {
              alert("Error updating user: ", errorData.error);
            } else {
                alert("Error updating user: ", errorData.error);
            }
          }).catch(() => {
            alert("Error updating user: ", errorData.error);
          });
        });
    }




}

const user = new User(userService);