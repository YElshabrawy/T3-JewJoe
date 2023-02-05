import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-8 dark:bg-gray-900 dark:text-white md:h-screen lg:py-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
