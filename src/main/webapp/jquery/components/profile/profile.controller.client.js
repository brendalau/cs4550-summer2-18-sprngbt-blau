(function () {
    var $usernameFld, $passwordFld, $firstNameFld, $lastNameFld;
    var $roleFld, $phoneFld, $emailFld, $dobFld;
    var $usernameStr, $passwordStr, $firstNameStr, $lastNameStr;
    var $roleStr, $phoneStr, $emailStr, $dobStr;
    var $updateBtn, $logoutBtn;
    var $successAlert;

    var userService = new UserServiceClient();

    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $firstNameFld = $('#firstNameFld');
        $lastNameFld = $('#lastNameFld');
        $roleFld = $('#roleFld');
        $phoneFld = $('#phoneFld');
        $emailFld = $('#emailFld');
        $dobFld = $('#dobFld');
        $updateBtn = $('#updateBtn');
        $logoutBtn = $('#logoutBtn');
        $successAlert = $('.alert');

        $successAlert.hide();

        initProfile();

        $updateBtn.click(updateProfile);
        $logoutBtn.click(logout);
    }

    function initProfile() {
        userService.initProfile()
            .then(renderUser);
    }

    function renderUser(user) {
        $usernameFld.val(user.username);
        $passwordFld.val(user.password);
        $firstNameFld.val(user.firstName);
        $lastNameFld.val(user.lastName);
        $roleFld.val(user.role);
        $phoneFld.val(user.phone);
        $emailFld.val(user.email);

        if (user.dob === null) {
            $dobFld.val(user.dob);
        } else {
            $dobFld.val(user.dob.substring(0, 10));
        }
    }

    function initVals() {
        $usernameStr = $usernameFld.val();
        $passwordStr = $passwordFld.val();
        $firstNameStr = $firstNameFld.val();
        $lastNameStr = $lastNameFld.val();
        $roleStr = $roleFld.val();
        $phoneStr = $phoneFld.val();
        $emailStr = $emailFld.val();
        $dobStr = $dobFld.val();
    }

    function updateProfile() {
        initVals();

        userService.updateProfile(new User($usernameStr, $passwordStr, $firstNameStr,
                                           $lastNameStr, $roleStr, $phoneStr, $emailStr, $dobStr))
            .then(this.initProfile)
            .then($successAlert.show());
    }

    function logout() {
        userService.logout()
            .then(window.location.href = '../login/login.template.client.html');
    }
});