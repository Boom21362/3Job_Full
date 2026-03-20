// src/app/profile/layout.tsx

export default function ProfileLayout({
  children,
  me, // This name MUST match your @folder name
}: {
  children: React.ReactNode;
  me: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      {/* This renders what you see in the screenshot ("Your Profile") */}
      {children} 

      {/* This renders your @me/page.tsx (The table and user info) */}
      <div className="mt-4">
        {me}
      </div>
    </div>
  );
}