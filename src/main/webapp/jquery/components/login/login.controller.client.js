(function () {
    var $usernameFld, $passwordFld;
    var $usernameStr, $passwordStr;
    var $loginBtn;

    var userService = new UserServiceClient();

    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $loginBtn = $('#loginBtn');

        $loginBtn.click(login);
    }

    function login() {
        $usernameStr = $usernameFld.val();
        $passwordStr = $passwordFld.val();

        if ($usernameStr === "" || $passwordStr === "") {
            alert('Both fields are required to log in');
        } else {
            userService.login($usernameStr, $passwordStr)
                .then(loginSuccess);
        }
    }

    function loginSuccess() {
        window.location.href = '../profile/profile.template.client.html';
    }
})();