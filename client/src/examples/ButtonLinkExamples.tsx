// Updated examples showing Button component as Link
import React from "react";
import Button from "../components/Button";

const ButtonLinkExamples: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Button as Link Examples</h2>

      {/* Regular buttons */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Regular Buttons</h3>
        <div className="space-x-4">
          <Button onClick={handleClick}>Regular Button</Button>
          <Button variant="outline" disabled>
            Disabled Button
          </Button>
        </div>
      </div>

      {/* React Router Links */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">React Router Links</h3>
        <div className="space-x-4">
          <Button as="link" to="/home" variant="primary">
            Go to Home
          </Button>
          <Button as="link" to="/login" variant="outline">
            Go to Login
          </Button>
          <Button
            as="link"
            to="/register"
            variant="secondary"
            leftIcon={<span>👤</span>}
          >
            Register
          </Button>
        </div>
      </div>

      {/* External Links */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">External Links</h3>
        <div className="space-x-4">
          <Button
            as="anchor"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            rightIcon={<span>↗</span>}
          >
            GitHub
          </Button>
          <Button
            as="anchor"
            href="mailto:support@example.com"
            variant="ghost"
            leftIcon={<span>📧</span>}
          >
            Email Support
          </Button>
        </div>
      </div>

      {/* Loading states for links */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Loading States</h3>
        <div className="space-x-4">
          <Button as="link" to="/dashboard" isLoading>
            Loading Link
          </Button>
          <Button as="anchor" href="#" isLoading variant="outline">
            Loading External
          </Button>
        </div>
      </div>

      {/* Different sizes and full width */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sizes and Layout</h3>
        <div className="space-x-4 mb-4">
          <Button as="link" to="/profile" size="sm">
            Small Link
          </Button>
          <Button as="link" to="/settings" size="lg">
            Large Link
          </Button>
        </div>
        <Button as="link" to="/dashboard" fullWidth variant="primary">
          Full Width Link
        </Button>
      </div>

      {/* Use cases in your app */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          Practical Examples for ChatApp
        </h3>
        <div className="space-x-4">
          <Button as="link" to="/chat" variant="primary">
            Start Chatting
          </Button>
          <Button as="link" to="/profile" variant="ghost">
            View Profile
          </Button>
          <Button as="link" to="/settings" variant="outline">
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonLinkExamples;
