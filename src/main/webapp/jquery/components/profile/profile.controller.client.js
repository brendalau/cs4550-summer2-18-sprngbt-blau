(function () {
    var $usernameFld, $phoneFld, $emailFld, $roleFld, $dobFld;
    var $updateBtn, $logoutBtn;
    var $successAlert;

    // var userService = new AdminUserServiceClient();
    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $phoneFld = $('#phoneFld');
        $emailFld = $('#emailFld');
        $roleFld = $('#roleFld');
        $dobFld = $('#dobFld');
        $updateBtn = $('#updateBtn');
        $logoutBtn = $('#logoutBtn');
        $successAlert = $('#alert');

        $successAlert.hide();
    }
})();