export const Footer = () => {
  return (
    <div className="py-4 border-t border-t-gray-400 text-center">
      <p className="text-xs text-gray-800">
        {process.env.SITE_NAME} @2024 All rights reserved.
      </p>
    </div>
  );
};
