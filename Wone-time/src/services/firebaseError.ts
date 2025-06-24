export function parseError  (code : string) : string{
    switch (code) {
    case "auth/invalid-credential":
        return "Invalid credentials. Please try again."

    case "auth/user-not-found":
        return "No user found with this email address.";
        
    case "auth/wrong-password":
        return "Incorrect password. Please try again.";
        
    case "auth/email-already-in-use":
        return "This email is already registered. Try logging in instead.";
        
    case "auth/invalid-email":
        return "The email address is invalid. Please enter a valid email.";
        
    case "auth/weak-password":
        return "The password is too weak. Please use at least 6 characters.";

    case "unverified-email":
        return "Email not verified. Please check you inbox and verify your email";

    case "auth/missing-password":
        return "Please enter your password";

    default:
        return "An unknown error occurred. Please try again.";
    }
}