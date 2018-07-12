(function () {
    var $usernameFld, $passwordFld, $firstNameFld, $lastNameFld, $roleFld;
    var $usernameStr, $passwordStr, $firstNameStr, $lastNameStr, $roleStr;
    var $searchBtn, $createBtn, $updateBtn;
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
        $userRowTemplate = $('.wbdv-template').clone().removeClass('wbdv-hidden');
        $tbody = $('.wbdv-tbody');

        findAllUsers();

        $searchBtn.click(findAllUsers);
        $createBtn.click(createUser);
        $updateBtn.click(updateUser);
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

        if ($usernameStr !== "" || $passwordStr !== ""
            || $firstNameStr !== "" || $lastNameStr !== "") {
            userService.createUser(new User($usernameStr, $passwordStr, $firstNameStr,
                                            $lastNameStr, $roleStr, null, null, null, null))
                .then(findAllUsers);
        } else {
            alert('All fields are required to create a user');
        }
    }

    function findAllUsers() {
        userService.findAllUsers()
            .then(renderUsers);
    }

    function findUserById() {
        var $currEditBtn = $(event.currentTarget);
        var $userId = $currEditBtn.parent().parent().parent().attr('id');

        userService.findUserById($userId)
            .then(populateFields);
    }

    function populateFields(user) {
        $usernameFld.val(user.username);
        $passwordFld.val(user.password);
        $firstNameFld.val(user.firstName);
        $lastNameFld.val(user.lastName);
        $roleFld.val(user.role);
    }

    function updateUser() {
        initVals();
        resetFlds();

        userService.updateUser(new User($usernameStr, $passwordStr, $firstNameStr,
                                        $lastNameStr, $roleStr, null, null, null))
            .then(findAllUsers);
    }

    function removeUser(event) {
        var $currRemoveBtn = $(event.currentTarget);
        var $userId = $currRemoveBtn.parent().parent().parent().attr('id');

        userService.removeUser($userId)
            .then(findAllUsers);
    }

    function resetFlds() {
        $usernameFld.val('');
        $passwordFld.val('');
        $firstNameFld.val('');
        $lastNameFld.val('');
        $roleFld.val('FACULTY');
    }

    function renderUser(user) {
        var $row = $userRowTemplate.clone();

        $row.attr('id', user.id);
        $row.find('.wbdv-username').html(user.username);
        $row.find('.wbdv-first-name').html(user.firstName);
        $row.find('.wbdv-last-name').html(user.lastName);
        $row.find('.wbdv-role').html(user.role);

        $row.find('.wbdv-remove').click(removeUser);
        $row.find('.wbdv-edit').click(findUserById);

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
