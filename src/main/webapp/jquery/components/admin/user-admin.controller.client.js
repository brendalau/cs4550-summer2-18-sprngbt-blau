(function () {
    var $usernameFld, $passwordFld, $firstNameFld, $lastNameFld, $roleFld;
    var $usernameStr, $passwordStr, $firstNameStr, $lastNameStr, $roleStr;
    var $searchBtn, $createBtn, $updateBtn, $removeBtn, $editBtn;
    var $userRowTemplate, $tbody;

    var userService = new UserServiceClient();
    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $firstNameFld = $('#firstNameFld');
        $lastNameFld = $('#lastNameFld');
        $roleFld = $('#roleFld')
        $searchBtn = $('.wbdv-search');
        $createBtn = $('.wbdv-create');
        $updateBtn = $('.wbdv-update');
        $removeBtn = $('.wbdv-remove');
        $editBtn = $('.wbdv-edit');
        $userRowTemplate = $('.wbdv-template').clone().removeClass('wbdv-hidden');
        $tbody = $('.wbdv-tbody');

        findAllUsers();

        $searchBtn.click(findAllUsers);
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

    function resetFlds() {
        $usernameStr.val('');
        $passwordStr.val('');
        $firstNameStr.val('');
        $lastNameStr.val('');
        $roleStr.val('FACULTY');
    }

    function createUser() {
        initVals();

        if ($usernameStr !== "" || $passwordStr !== ""
            || $firstNameStr !== "" || $lastNameStr !== "") {
            userService.createUser(new User($usernameStr, $passwordStr, $firstNameStr,
                                            $lastNameStr, $roleStr, null, null, null, null))
                .then(findAllUsers);
        } else {
            alert('All fields are required to create a user');
        }
    }

    function updateUser() {
        initVals();
        resetFlds();

        var $currCheckBtn = $(event.currentTarget);
        var $userId = $currCheckBtn.parent().parent().parent().attr('id');

        userService.updateUser($userId,  new User($usernameStr, $passwordStr, $firstNameStr,
                                                  $lastNameStr, $roleStr, null, null, null, null))
            .then(findAllUsers);
    }

    function removeUser() {
        var $currRemoveBtn = $(event.currentTarget);
        var $userId = $currRemoveBtn.parent().parent().parent().attr('id');

        userService.removeUser($userId)
            .then(findAllUsers);
    }

    function populateFields(user) {
        $usernameFld.val(user.username);
        $passwordFld.val(user.password);
        $firstNameFld.val(user.firstName);
        $lastNameFld.val(user.lastName);
        $roleFld.val(user.role);
    }

    function findUserById() {
        var $currEditBtn = $(event.currentTarget);
        var $userId = $currEditBtn.parent().parent().parent().attr('id');

        userService.findUserById($userId)
            .then(populateFields);
    }

    function renderUser(user) {
        var $row = $userRowTemplate.clone();

        $row.attr('id', user.id);
        $row.find('.wbdv-username').html(user.username);
        $row.find('.wbdv-firstName').html(user.firstName);
        $row.find('.wbdv-lastName').html(user.lastName);
        $row.find('.wbdv-role').html(user.role);

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
