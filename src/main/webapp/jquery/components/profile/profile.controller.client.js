(function () {
    var $usernameFld, $passwordFld, $firstNameFld, $lastNameFld;
    var $roleFld, $phoneFld, $emailFld, $dobFld;
    var $usernameStr, $passwordStr, $firstNameStr, $lastNameStr;
    var $roleStr, $phoneStr, $emailStr, $dobStr;
    var $updateBtn, $logoutBtn;
    var $successAlert;
    var $currUser = null;

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

        userService.populateProfile()
            .then(renderUser);

        $updateBtn.click(updateProfile);
    }

    function renderUser(user) {
        console.log(user);
        $usernameFld.val(user.username);
        $passwordFld.val(user.password);
        $firstNameFld.val(user.firstName);
        $lastNameFld.val(user.lastName);
        $roleFld.val(user.role);
        $phoneFld.val(user.phone);
        $emailFld.val(user.email);
        $dobFld.val(user.dob);
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
            .then(renderUser)
            .then(showAlert);
    }

    function showAlert() {
        $successAlert.show();
    }
})();