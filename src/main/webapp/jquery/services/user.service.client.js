function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.updateUser = updateUser;
    this.removeUser = removeUser;


    this.register = register;

    this.login = login;

    this.initProfile = initProfile;
    this.updateProfile = updateProfile;
    this.logout = logout;

    this.logoutUrl = 'http://localhost:8080/api/logout';
    this.profileUrl = 'http://localhost:8080/api/profile';
    this.loginUrl = 'http://localhost:8080/api/login';
    this.registerUrl = 'http://localhost:8080/api/register';
    this.userUrl = 'http://localhost:8080/api/user';
    var self = this;

    function createUser(user) {
        return fetch(
            self.userUrl, {
                method: 'post',
                body: JSON.stringify(user),
                headers: {'content-type': 'application/json'}
            });
    }

    function findAllUsers() {
        return fetch(self.userUrl)
            .then(function(response) {
                return response.json();
            });
    }

    function findUserById(userId) {
        return fetch(self.userUrl + '/id/' + userId)
            .then(function(response) {
                return response.json();
            });
    }

    function updateUser(user) {
        return fetch(
            self.userUrl, {
                method: 'put',
                body: JSON.stringify(user),
                headers: {'content-type': 'application/json'}
            });
    }

    function removeUser(userId) {
        return fetch(
            self.userUrl + '/' + userId, {
                 method: 'delete'
             });
    }

    function register(user) {
        return fetch(
            self.registerUrl, {
                method: 'post',
                body: JSON.stringify(user),
                credentials: 'include',
                headers: {'content-type': 'application/json'},
            })
            .then(function(response) {
                if(response.status === 201) {
                    return null;
                } else {
                    return response.json();
                }
            });
    }

    function login(username, password) {
        return fetch(
            self.loginUrl, {
                method: 'post',
                body: JSON.stringify({username:username, password:password}),
                headers: {'content-type': 'application/json'},
                credentials: 'include'
            })
            .then(function(response) {
                if(response.status === 403) {
                    return null;
                } else {
                    return response.json();
                }
            });
    }

    function initProfile() {
        return fetch(
            self.profileUrl, {
            credentials: 'include'
            })
            .then(function(response) {
                return response.json();
            });
    }

    function updateProfile(user) {
        return fetch(
            self.profileUrl, {
                 method: 'put',
                 body: JSON.stringify(user),
                 headers: {'content-type': 'application/json'}
             });
    }

    function logout() {
        return fetch(self.logoutUrl, {
            method: 'post'
        });
    }
}