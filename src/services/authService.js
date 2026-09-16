const AuthService = {
  // Simulated user database
  getUsers: () => {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  },

  // Register a new user
  register: (fullName, email, phone, password) => {
    const users = AuthService.getUsers();

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      fullName,
      email,
      phone,
      password, // In a real app, this would be hashed
    };

    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    return { success: true, message: "Registration successful" };
  },

  // Login user
  login: (email, password, rememberMe = false) => {
    const users = AuthService.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    // Store session info (not password)
    const sessionData = {
      isLoggedIn: true,
      userEmail: user.email,
      userName: user.fullName,
      userId: user.id,
    };

    if (rememberMe) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.fullName);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("rememberMe", "true");
    } else {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", user.email);
      sessionStorage.setItem("userName", user.fullName);
      sessionStorage.setItem("userId", user.id.toString());
    }

    return { success: true, user: sessionData };
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return (
      localStorage.getItem("isLoggedIn") === "true" ||
      sessionStorage.getItem("isLoggedIn") === "true"
    );
  },

  // Get current user
  getCurrentUser: () => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true" ||
      sessionStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) return null;

    return {
      email:
        localStorage.getItem("userEmail") ||
        sessionStorage.getItem("userEmail"),
      name:
        localStorage.getItem("userName") ||
        sessionStorage.getItem("userName"),
      id:
        localStorage.getItem("userId") || sessionStorage.getItem("userId"),
    };
  },
};

export default AuthService;
