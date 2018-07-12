(function () {
    var $usernameFld, $passwordFld;
    var $usernameStr, $passwordStr;
    var $usernameAlert, $fieldsAlert, $loginBtn;

    var userService = new UserServiceClient();

    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $usernameAlert = $('#usernameAlert');
        $fieldsAlert = $('#fieldsAlert');
        $loginBtn = $('#loginBtn');

        $usernameAlert.hide();
        $fieldsAlert.hide();

        $loginBtn.click(login);
    }

    function login() {
        $usernameAlert.hide();
        $fieldsAlert.hide();

        $usernameStr = $usernameFld.val();
        $passwordStr = $passwordFld.val();

        if ($usernameStr === "" || $passwordStr === "") {
            $fieldsAlert.show();
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
