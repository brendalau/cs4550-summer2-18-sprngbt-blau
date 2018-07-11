function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.removeUser = removeUser;
    this.updateUser = updateUser;

    this.register = register;
    this.findUserByUsername = findUserByUsername;

    this.login = login;

    this.url = 'http://localhost:8080/api/user';
    var self = this;

    function createUser(user) {
        return fetch(
            self.url, {
                method: 'post',
                body: JSON.stringify(user),
                headers: {'content-type': 'application/json'
                }
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
                 headers: {
                     'content-type': 'application/json'
                 }
             });
    }

    function register(user) {
        return fetch(
            self.url, {
                method: 'post',
                body: JSON.stringify(user),
                headers: {'content-type': 'application/json'
                },
                'credentials': 'include'
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
        return fetch(self.url + '/' + username)
            .then(function (response) {
                return response.json();
            });
    }

    function login(username, password) {
        return fetch(
            self.url, {
                method: 'post',
                body: JSON.stringify({username:username, password:password}),
                headers: {'content-type': 'application/json'}
            });
    }
}