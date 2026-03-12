const { UserManager } = require("./script");

console.log("Running tests...");

const manager = UserManager();

const u1 = manager.createUser({
    name: "Test1",
    email: "test1@gmail.com",
    role: "admin"
});

const u2 = manager.createUser({
    name: "Test2",
    email: "test2@gmail.com",
    role: "user"
});

console.assert(manager.getAllUsers().length === 2);
console.assert(manager.getUsersByRole("admin").length === 1);

manager.updateUser(u2.id, {
    name: "Updated",
    email: "updated@gmail.com",
    role: "moderator"
});

console.assert(manager.getUser(u2.id).name === "Updated");

manager.deleteUser(u1.id);

console.assert(manager.getAllUsers().length === 1);

console.log("All tests passed!");