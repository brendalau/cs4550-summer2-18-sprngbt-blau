(function () {
    var $usernameFld, $passwordFld, $password2Fld;
    var $usernameStr, $passwordStr, $password2Str;
    var $registerBtn;

    var userService = new UserServiceClient();

    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $password2Fld = $('#password2Fld');
        $registerBtn = $('#registerBtn');

        $registerBtn.click(register);
    }

    function register() {
        $usernameStr = $usernameFld.val();
        $passwordStr = $passwordFld.val();
        $password2Str = $password2Fld.val();

        if ($usernameStr === "" || $passwordStr === "" || $password2Str === "") {
            alert('All fields are required to sign up');
        } else if ($passwordStr !== $password2Str) {
            alert('Passwords do not match');
        } else {
            alert('hello');
            userService.register(new User($usernameStr, $passwordStr,
                                          null, null, null, null, null, null))
                .then(function (response) {
                    if(response === null) {
                        window.location.href = '../profile/profile.template.client.html';
                    } else {
                        alert('Username already taken');
                    }
                });
        }
    }
})();
