import { useEffect, useState } from 'react';
import { getTopTracks, refreshAccessToken } from '../services/SpotifyService';

interface UseTokenProps {
    clientId: string;
    clientSecret: string;
}

const useToken = ({ clientId, clientSecret }: UseTokenProps): string | null => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            let token = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');

            if (!token && refreshToken) {
                try {
                    const { access_token, refresh_token } = await refreshAccessToken(refreshToken, clientId, clientSecret);
                    token = access_token;
                    localStorage.setItem('access_token', access_token);
                    if (refresh_token) {
                        localStorage.setItem('refresh_token', refresh_token);
                    }
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                }
            }

            if (token) {
                setAccessToken(token);
                try {
                    await getTopTracks(token);
                } catch (error) {
                    console.error('Failed to fetch top tracks:', error);
                }
            } else {
                console.error('No access or refresh token available');
            }

            const expiresIn = 3600;
            if (token && refreshToken) {
                const timeout = setTimeout(async () => {
                    try {
                        const { access_token, refresh_token } = await refreshAccessToken(refreshToken, clientId, clientSecret);
                        localStorage.setItem('access_token', access_token);
                        setAccessToken(access_token);
                        if (refresh_token) {
                            localStorage.setItem('refresh_token', refresh_token);
                        }
                    } catch (err) {
                        console.error('Error refreshing token on expiry:', err);
                    }
                }, (expiresIn - 60) * 1000);

                return () => clearTimeout(timeout);
            }
        };

        init();
    }, [clientId, clientSecret]);

    return accessToken;
};

export default useToken;
