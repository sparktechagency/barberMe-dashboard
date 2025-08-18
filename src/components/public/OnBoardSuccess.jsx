import React, { useEffect, useState } from "react";

const ObBoardSuccess = () => {
  const [countdown, setCountdown] = useState(3);
  const deepLinkURL = "barberonboardsuccess://onboard/success"; // Your custom URL scheme
  const fallbackURL = "https://www.admin.barbermeus.com/"; // Fallback if app not installed
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isMobile) {
            openAppWithFallback();
          } else {
            // Redirect to web fallback or success page for desktop
            window.location.href = fallbackURL;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const openAppWithFallback = () => {
    const start = Date.now();
    window.location = deepLinkURL;

    // Fallback if the app isn't installed after ~1 second
    setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.location = fallbackURL;
      }
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.success}>✅ Account Created Successfully!</div>

        {/* Manual button fallback with user gesture */}
        <button onClick={openAppWithFallback} style={styles.button}>
          Open in App
        </button>

        {/* For accessibility/fallback
        <a href={deepLinkURL} style={styles.link}>
          Or click here if not redirected
        </a> */}

        <div style={styles.timer}>
          Redirecting in <span>{countdown}</span> seconds...
        </div>
      </div>
    </div>
  );
};

// Styling (you can move this to a CSS file if preferred)
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f8ff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    margin: 0,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  success: {
    fontSize: "1.5rem",
    color: "#28a745",
    marginBottom: "1rem",
  },
  button: {
    fontSize: "1rem",
    color: "#ffffff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "8px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  link: {
    fontSize: "1rem",
    color: "#007bff",
    textDecoration: "none",
    display: "inline-block",
    marginTop: "0.5rem",
  },
  timer: {
    marginTop: "0.5rem",
    fontSize: "0.9rem",
    color: "#555",
  },
};

export default ObBoardSuccess;
