(function () {
    var $usernameFld, $passwordFld, $firstNameFld, $lastNameFld, $roleFld;
    var $retrieveBtn, $createBtn, $updateBtn, $removeBtn, $editBtn;
    var $userRowTemplate, $tbody;

    var userService = new AdminUserServiceClient();
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

        userService.findAllUsers(renderUsers);
        $retrieveBtn.click(findAllUsers);
        $createBtn.click(createUser);
        // $updateBtn.click(updateUser);
        // $removeBtn.click(removeUser);
        // $editBtn.click(editUser);
    }

    function findAllUsers() {
        alert('find all');
    }

    function createUser() {
        alert('create');
        var $usernameStr = $usernameFld.val();
        var $passwordStr = $passwordFld.val();
        var $firstNameStr = $firstNameFld.val();
        var $lastNameStr = $lastNameFld.val();
        var $roleStr = $roleFld.val();

        // $user = User($usernameStr, $passwordStr, $firstNameStr, $lastNameStr, $roleStr);
    }

    // function findUserById() { … }
    // function deleteUser() { … }
    // function selectUser() { … }
    // function updateUser() { … }
    // function renderUser(user) { … }
    function renderUsers(users) {
        $tbody.empty();
        for(var u in users) {
            var user = users[u];
            var $row = $userRowTemplate.clone();
            $row.find('wbdv-username')
                .html(user.username);
            $tbody.append($row);
        }
    }
})();
