// Example usage of the reusable Button component
import React from "react";
import Button from "../components/Button";

const ButtonExamples: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Button Component Examples</h2>

      {/* Basic buttons with different variants */}
      <div className="space-x-4">
        <Button variant="primary" onClick={handleClick}>
          Primary Button
        </Button>
        <Button variant="secondary" onClick={handleClick}>
          Secondary Button
        </Button>
        <Button variant="outline" onClick={handleClick}>
          Outline Button
        </Button>
        <Button variant="ghost" onClick={handleClick}>
          Ghost Button
        </Button>
        <Button variant="destructive" onClick={handleClick}>
          Delete
        </Button>
      </div>

      {/* Different sizes */}
      <div className="space-x-4">
        <Button size="sm" onClick={handleClick}>
          Small
        </Button>
        <Button size="md" onClick={handleClick}>
          Medium
        </Button>
        <Button size="lg" onClick={handleClick}>
          Large
        </Button>
        <Button size="xl" onClick={handleClick}>
          Extra Large
        </Button>
      </div>

      {/* With icons */}
      <div className="space-x-4">
        <Button leftIcon={<span>📧</span>} onClick={handleClick}>
          Send Email
        </Button>
        <Button
          rightIcon={<span>→</span>}
          variant="outline"
          onClick={handleClick}
        >
          Next
        </Button>
      </div>

      {/* Loading state */}
      <div className="space-x-4">
        <Button isLoading onClick={handleClick}>
          Loading...
        </Button>
        <Button isLoading variant="outline">
          Processing
        </Button>
      </div>

      {/* Disabled state */}
      <div className="space-x-4">
        <Button disabled onClick={handleClick}>
          Disabled Primary
        </Button>
        <Button disabled variant="secondary">
          Disabled Secondary
        </Button>
      </div>

      {/* Full width */}
      <div>
        <Button fullWidth variant="primary" onClick={handleClick}>
          Full Width Button
        </Button>
      </div>

      {/* Custom styling */}
      <div>
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={handleClick}
        >
          Custom Gradient Button
        </Button>
      </div>
    </div>
  );
};

export default ButtonExamples;
