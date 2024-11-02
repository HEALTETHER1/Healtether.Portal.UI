import { useEffect } from "react";

export function RedirectPhonePay()
{
  useEffect(() => {
    const params = new URLSearchParams(location.search);
     const inputString = params.get('search');
     const redirectUrl = atob(inputString);
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace(redirectUrl);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return <div>Redirecting...</div>;
}