(function () {
    var $usernameFld, $passwordFld, $firstNameFld, $lastNameFld, $roleFld;
    var $retrieveBtn, $createBtn, $updateBtn, $removeBtn, $editBtn;
    var $userRowTemplate, $tbody;

    var userService = new UserServiceClient();
    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $firstNameFld = $('#firstNameFld');
        $lastNameFld = $('#lastNameFld');
        $roleFld = $('#roleFld')
        $retrieveBtn = $('.wbdv-search');
        $createBtn = $('.wbdv-create');
        $updateBtn = $('.wbdv-update');
        $removeBtn = $('.wbdv-remove');
        $editBtn = $('.wbdv-edit');
        $userRowTemplate =
            $('.wbdv-template')
                .clone()
                .removeClass('wbdv-hidden');
        $tbody = $('.wbdv-tbody');

        // findAllUsers();

        // $retrieveBtn.click(findAllUsers);
        $createBtn.click(createUser);
        // $updateBtn.click(updateUser);
        // $removeBtn.click(removeUser);
        // $editBtn.click(findUserById);
    }

    // function findAllUsers() {
    //     userService.findAllUsers()
    //         .then(renderUsers);
    // }

    function createUser() {
        var $usernameStr = $usernameFld.val();
        var $passwordStr = $passwordFld.val();
        var $firstNameStr = $firstNameFld.val();
        var $lastNameStr = $lastNameFld.val();
        var $roleStr = $roleFld.val();
        var $user = new User($usernameStr, $passwordStr, $firstNameStr, $lastNameStr, $roleStr);

        // userService.createUser($user)
        //     .then(findAllUsers);

        userService.createUser($user);
    }

    // function updateUser(event) {
    //     var $currCheckBtn = $(event.currentTarget);
    //     var $userId = $currCheckBtn
    //         .parent()
    //         .parent()
    //         .attr('id');
    //     var $user = new User($usernameStr, $passwordStr, $firstNameStr, $lastNameStr, $roleStr);
    //
    //     userService.updateUser($userId, $user)
    //         .then(findAllUsers);
    // }
    //
    // function removeUser() {
    //     var $currRemoveBtn = $(event.currentTarget);
    //     var $userId = $currRemoveBtn
    //         .parent()
    //         .parent()
    //         .attr('id');
    //
    //     userService.removeUser($userId)
    //         .then(findAllUsers);
    // }
    //
    // function findUserById(event) {
    //     var $currEditBtn = $(event.currentTarget);
    //     var $userId = $currEditBtn
    //         .parent()
    //         .parent()
    //         .attr('id');
    //
    //     userService.findUserById($userId)
    //         .then(findAllUsers);
    // }
    //
    // // function renderUser(user) {
    // //     $usernameFld.html
    // // }
    //
    // function renderUsers(users) {
    //     $tbody.empty();
    //     for(var u in users) {
    //         var user = users[u];
    //         var $row = $userRowTemplate.clone();
    //         $row.attr('id', user.id);
    //         $row.find('wbdv-username')
    //             .html(user.username);
    //         $tbody.append($row);
    //     }
    // }
})();
