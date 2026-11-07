import React from "react";

export default function Panel() {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <EmptyState></EmptyState>
      <ErrorState></ErrorState>
    </Card>
  );
}
