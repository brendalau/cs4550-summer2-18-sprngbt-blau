(function () {
    var $usernameFld, $passwordFld, $firstNameFld, $lastNameFld, $roleFld;
    var $usernameStr, $passwordStr, $firstNameStr, $lastNameStr, $roleStr;
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
        $userRowTemplate = $('.wbdv-template').clone().removeClass('wbdv-hidden');
        $tbody = $('.wbdv-tbody');

        findAllUsers();

        $retrieveBtn.click(findAllUsers);
        $createBtn.click(createUser);
        $updateBtn.click(updateUser);
        $removeBtn.click(removeUser);
        $editBtn.click(findUserById);
    }

    function findAllUsers() {
        userService.findAllUsers()
            .then(renderUsers);
    }

    function initVals() {
        $usernameStr = $usernameFld.val();
        $passwordStr = $passwordFld.val();
        $firstNameStr = $firstNameFld.val();
        $lastNameStr = $lastNameFld.val();
        $roleStr = $roleFld.val();
    }

    function createUser() {
        initVals();

        if ($usernameStr && $passwordStr && $firstNameStr && $lastNameStr && $roleStr != null) {
            // userService.createUser($user)
            //     .then(findAllUsers);

            userService.createUser(new User($usernameStr, $passwordStr, $firstNameStr,
                                            $lastNameStr, $roleStr))
                .then(findAllUsers);
        } else {
            alert('All fields are required to create a user');
        }
    }

    function updateUser(event) {
        initVals();

        var $currCheckBtn = $(event.currentTarget);
        var $userId = $currCheckBtn.parent().parent().parent().attr('id');

        userService.updateUser($userId,  new User($usernameStr, $passwordStr, $firstNameStr,
                                                  $lastNameStr, $roleStr))
            .then(findAllUsers);
    }

    function removeUser() {
        var $currRemoveBtn = $(event.currentTarget);
        var $userId = $currRemoveBtn.parent().parent().parent().attr('id');

        userService.removeUser($userId)
            .then(findAllUsers);
    }

    function revalFields(user) {
        $usernameFld.val(user.username);
        $passwordFld = $(user.password);
        $firstNameFld = $(user.firstName);
        $lastNameFld = $(user.lastName);
        $roleFld = $(user.role);
    }

    function findUserById() {
        var $currEditBtn = $(event.currentTarget);
        var $userId = $currEditBtn.parent().parent().parent().attr('id');

        userService.findUserById($userId)
            .then(revalFields);
    }

    function renderUser(user) {
        var $row = $userRowTemplate.clone();

        $row.attr('id', user.id);
        $row.find('wbdv-username').html(user.username);
        $row.find('wbdv-firstName').html(user.firstName);
        $row.find('wbdv-lastName').html(user.lastName);
        $row.find('wbdv-role').html(user.role);

        $tbody.append($row);
    }

    function renderUsers(users) {
        $tbody.empty();

        for(var u in users) {
            var $currUser = users[u];
            renderUser($currUser);
        }
    }
})();
