(function () {
    var $usernameFld, $passwordFld;
    var $usernameStr, $passwordStr;
    var $usernameAlert, $loginBtn;

    var userService = new UserServiceClient();

    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $usernameAlert = $('.alert');
        $loginBtn = $('#loginBtn');

        $usernameAlert.hide();

        $loginBtn.click(login);
    }

    function login() {
        $usernameStr = $usernameFld.val();
        $passwordStr = $passwordFld.val();

        if ($usernameStr === "" || $passwordStr === "") {
            alert('Both fields are required to log in');
        } else {
            userService.login($usernameStr, $passwordStr)
                .then(function (response) {
                if(response !== null) {
                    window.location.href = '../profile/profile.template.client.html';
                } else {
                    $usernameAlert.show();
                }
            });
        }
    }
})();
