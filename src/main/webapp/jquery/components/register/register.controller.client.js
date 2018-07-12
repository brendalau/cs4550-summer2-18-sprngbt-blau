(function () {
    var $usernameFld, $passwordFld, $password2Fld;
    var $usernameStr, $passwordStr, $password2Str;
    var $usernameAlert, $passwordAlert, $fieldsAlert;
    var $registerBtn;

    var userService = new UserServiceClient();

    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $password2Fld = $('#password2Fld');
        $usernameAlert = $('#usernameAlert');
        $passwordAlert = $('#passwordAlert');
        $fieldsAlert = $('#fieldsAlert');

        $registerBtn = $('#registerBtn');

        $usernameAlert.hide();
        $passwordAlert.hide();
        $fieldsAlert.hide();


        $registerBtn.click(register);
    }

    function register() {
        $usernameAlert.hide();
        $passwordAlert.hide();
        $fieldsAlert.hide();

        $usernameStr = $usernameFld.val();
        $passwordStr = $passwordFld.val();
        $password2Str = $password2Fld.val();

        if ($usernameStr === "" || $passwordStr === "" || $password2Str === "") {
            $fieldsAlert.show();
        } else if ($passwordStr !== $password2Str) {
            $passwordAlert.show();
        } else {
            userService.register(new User($usernameStr, $passwordStr,
                                          null, null, null, null, null, null))
                .then(function (response) {
                    if(response === null) {
                        window.location.href = '../profile/profile.template.client.html';
                    } else {
                        $usernameAlert.show();
                    }
                });
        }
    }
})();
