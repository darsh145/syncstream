import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Password reset requested for:", email);
      // Here you would typically make an API call to your backend
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Reset Password</h2>
          <p>Enter your email to receive a password reset link</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {isSubmitted ? (
          <div className="success-message">
            <p>
              If an account exists with the email <strong>{email}</strong>, you
              will receive password reset instructions shortly.
            </p>
            <div className="auth-footer">
              <Link to="/login" className="auth-button">
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        )}

        {!isSubmitted && (
          <div className="auth-footer">
            <p>
              Remember your password? <Link to="/login">Sign in</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
