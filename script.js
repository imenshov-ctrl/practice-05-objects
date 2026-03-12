/**
 * Перевірка email
 */
function isValidEmail(email) {
    return typeof email === "string" && email.includes("@") && email.includes(".");
}

/**
 * Створення користувача
 */
function createUser({ id, name, email, role = "user", createdAt = new Date() }) {

    if (!name || typeof name !== "string") {
        throw new Error("Invalid name");
    }

    if (!isValidEmail(email)) {
        throw new Error("Invalid email");
    }

    return {
        id,
        name,
        email,
        role,
        createdAt,

        getInfo() {
            return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Role: ${this.role}`;
        },

        updateProfile(data) {

            const {
                name = this.name,
                email = this.email,
                role = this.role
            } = data;

            return createUser({
                id: this.id,
                name,
                email,
                role,
                createdAt: this.createdAt
            });
        },

        isAdmin() {
            return this.role === "admin";
        }
    };
}

/**
 * Менеджер користувачів
 */
function UserManager() {

    let users = [];
    let nextId = 1;

    return {

        createUser(data) {

            const user = createUser({
                id: nextId++,
                ...data
            });

            users = [...users, user];

            return user;
        },

        getUser(id) {
            return users.find(user => user.id === id);
        },

        updateUser(id, data) {

            users = users.map(user =>
                user.id === id
                    ? user.updateProfile(data)
                    : user
            );

            return this.getUser(id);
        },

        deleteUser(id) {

            users = users.filter(user => user.id !== id);

            return true;
        },

        getAllUsers() {
            return [...users];
        },

        getUsersByRole(role) {
            return users.filter(user => user.role === role);
        }

    };
}


/* ===== DEMO ===== */

if (require.main === module) {

    const manager = UserManager();

    manager.createUser({
        name: "Ivan",
        email: "ivan@gmail.com",
        role: "admin"
    });

    manager.createUser({
        name: "Anna",
        email: "anna@gmail.com",
        role: "user"
    });

    console.log("All users:");
    console.log(manager.getAllUsers());

    console.log("\nAdmins:");
    console.log(manager.getUsersByRole("admin"));

}


/* ===== EXPORT ===== */

module.exports = {
    createUser,
    UserManager
};