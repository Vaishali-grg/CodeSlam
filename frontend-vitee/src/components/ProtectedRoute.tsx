// src/components/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Navigate, Outlet } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js'; // <-- Import Session type

function ProtectedRoute() {
  const [session, setSession] = useState<Session | null>(null); // <-- Use Session type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return session ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;