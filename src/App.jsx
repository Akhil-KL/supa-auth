import { useState, useEffect } from 'react';
import './App.css';
import { supabase } from '../supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
    const [session, setSession] = useState(null);
    const [username, setUsername] = useState('');
    const [isUsernameSet, setIsUsernameSet] = useState(false);

    useEffect(() => {
        // Get current session and set it
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            // Check if username exists in user_metadata
            if (session?.user?.user_metadata?.username) {
                setIsUsernameSet(true); // Username already set
            }
        });

        // Listen for auth state changes (e.g., login/logout)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session?.user?.user_metadata?.username) {
                setIsUsernameSet(true); // Username already set
            }
        });

        return () => subscription.unsubscribe(); // Unsubscribe on component unmount
    }, []);

    console.log(session?.user?.email); //email of the user
    console.log(session?.user?.id); //id of the user
    console.log(session?.user?.user_metadata?.username); //username of the user

    // Sign out function
    const signOut = async () => {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (!session) {
            console.error('No session exists in Supabase client — cannot sign out.');
            return;
        }

        const { error } = await supabase.auth.signOut();
        if (error) console.error('Sign out error:', error.message);
        else console.log('Signed out successfully');
    };

    // Sign up function
    const signUp = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:5173/',
            },
        });
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const saveUsername = async () => {
        if (username) {
            const { error } = await supabase.auth.updateUser({
                data: { username: username }
            });

            if (error) {
                console.error('Error updating username:', error.message);
            } else {
                setIsUsernameSet(true); // Mark as username set
                alert('Username saved!');
            }
        }

    };

    if (!session) {
        return (
            <>
                <button onClick={signUp}>Sign up with Google</button>
            </>
        );
    } else {
        return (
            <div>
                <h1>Welcome</h1>

                <div className='m-5'>
                    <label>
                        Set a unique username:
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter a unique username"
                        />
                    </label>
                    <button onClick={saveUsername}>Save Username</button>
                </div>
                {isUsernameSet && (
                    <h2>Your username: {session?.user?.user_metadata?.username}</h2>
                )}
                <button className='m-5' onClick={signOut}>Sign Out</button>
            </div>
        );
    }
}

export default App;
