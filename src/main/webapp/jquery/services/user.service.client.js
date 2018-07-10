function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.removeUser = removeUser;
    this.updateUser = updateUser;

    this.register = register;
    // this.registerSuccess = registerSuccess;

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
            })
            .then(function (response) {
                if (response.bodyUsed) {
                    return response.json();
                } else {
                    return null;
                }
            });
    }


    function register(user) {
        return createUser(user);
    }

    // function findUserByEmail(email) {
    //     $.ajax({
    //                url: self.url +
    //                method:'post',
    //                data:{email: email},
    //                success:function(msg){
    //                    alert(msg); // your message will come here.
    //                }
    //             });
    // }
}