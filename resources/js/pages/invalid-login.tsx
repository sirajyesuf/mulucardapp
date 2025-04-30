import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const MagicLinkError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full text-center shadow-none rounded-2xl p-6">
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="text-red-500 w-12 h-12" />
            <h1 className="text-2xl font-bold">Login Failed</h1>
            <p className="text-gray-600">
              Your magic login link is invalid or has expired. Please request a new link to continue.
            </p>
            <Button variant="default" className="font-medium">
                                <Link href={route('login')}>Log in</Link>
                            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MagicLinkError;


