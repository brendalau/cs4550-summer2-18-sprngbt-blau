function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.removeUser = removeUser;
    this.updateUser = updateUser;
    // this.login = login();
    this.url = 'http://localhost:8080/api/user';
    // this.login = 'http://localhost:8080/api/login';
    var self = this;

    // function login(username, password) {
    //     return fetch(
    //         self.login,
    //         {method: 'post',
    //          body: JSON.stringify({username:username, password: password}),
    //          headers: {'content-type': 'application/json'}
    //         });
    // }

    function createUser(user) {
        return fetch(
            self.url,
            {method: 'post',
             body: JSON.stringify(user),
             headers: {'content-type': 'application/json'}
            });
    }

    function findAllUsers(callback) {
        return fetch(self.url)
            .then(JSON.stringify(callback));
    }

    function findUserById(userId) {
        return fetch(
            self.url + '/' + userId
        );
    }

    function updateUser(userId, user) {
        return fetch(
            self.url + '/' + userId,
            {method: 'put',
             body: JSON.stringify(user),
             headers: {'content-type': 'application/json'}
            });
    }

    function removeUser(userId) {
        return fetch(
            self.url + '/' + userId,
            {method: 'delete'})
    }
}