function User(username, password, firstName, lastName, role) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = null;
    this.phone = null;
    this.dob = null;

    this.setUsername = setUsername;
    this.getUsername = getUsername;
    this.setPassword = setPassword;
    this.getPassword = getPassword;
    this.setFirstName = setFirstName;
    this.getFirstName = getFirstName;
    this.setLastName = setLastName;
    this.getLastName = getLastName;
    this.setRole = setRole;
    this.getRole = getRole;
    this.getEmail = getEmail;
    this.setEmail = setEmail;
    this.getPhone = getPhone;
    this.setPhone = setPhone;
    this.getDob = getDob;
    this.setDob = setDob;

    function setUsername(username) {
        this.username = username;
    }
    function getUsername() {
        return this.username;
    }
    function setPassword(password) {
        this.password = password;
    }
    function getPassword() {
        return this.password;
    }
    function setFirstName(firstName) {
        this.firstName = firstName;
    }
    function getFirstName() {
        return this.firstName;
    }
    function setLastName(lastName) {
        this.lastName = lastName;
    }
    function getLastName() {
        return this.lastName;
    }
    function setEmail(email) {
        this.email = email;
    }
    function getEmail() {
        return this.email;
    }
    function setPhone(phone) {
        this.phone = phone;
    }
    function getPhone() {
        return this.phone;
    }
    function setRole(role) {
        this.role = role;
    }
    function getRole() {
        return this.role;
    }
    function setDob(dob) {
        this.dob = dob;
    }
    function getDob() {
        return this.dob;
    }
}