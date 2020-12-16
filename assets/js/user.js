export { User }
class User {
    constructor(userid, username, email, balance) {
        this.userid = userid;
        this.username = username;
        this.email = email;
        this.balance = balance;
    }

    getUsername() { return this.username; }
    getEmail() { return this.email; }
    getBalance() { return this.balance; }
    setBalance(balance) { this.balance = balance; }
}