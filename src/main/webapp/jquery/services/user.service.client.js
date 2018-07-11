function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.removeUser = removeUser;
    this.updateUser = updateUser;

    this.register = register;
    this.findUserByUsername = findUserByUsername;

    this.login = login;

    this.loginUrl = 'http://localhost:8080/api/login';
    this.registerUrl = 'http://localhost:8080/api/register';
    this.userUrl = 'http://localhost:8080/api/user';
    var self = this;

    function createUser(user) {
        return fetch(
            self.url, {
                method: 'post',
                body: JSON.stringify(user),
                headers: {'content-type': 'application/json'}
            });
    }

    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
                return response.json();
            });
    }

    function findUserById(userId) {
        return fetch(self.url + '/' + userId)
            .then(function (response) {
                return response.json();
            });
    }

    function removeUser(userId) {
        return fetch(
            self.url + '/' + userId, {
                 method: 'delete'
             });
    }

    function updateUser(userId, user) {
        return fetch(
            self.url + '/' + userId, {
                 method: 'put',
                 body: JSON.stringify(user),
                 headers: {'content-type': 'application/json'}
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
            .then(registerStatus);
    }

    function registerStatus(response) {
        if (response.status === 200) {
            window.location.href = '../profile/profile.template.client.html';
        } else {
            alert('Username is already taken');
        }
    }

    function findUserByUsername(username) {
        return fetch(self.registeUrl + '/' + username)
            .then(function (response) {
                return response.json();
            });
    }

    function login(username, password) {
        return fetch(
            self.loginUrl, {
                method: 'post',
                body: JSON.stringify({username:username, password:password}),
                credentials: 'include',
                headers: {'content-type': 'application/json'}
            })
            .then(loginStatus);
    }

    function loginStatus(response) {
        if (response.status === 200) {
            window.location.href = '../profile/profile.template.client.html';
        } else {
            alert('User does not exist');
        }
    }
}