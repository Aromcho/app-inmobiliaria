import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    const [accessToken, setAccessToken] = React.useState(null);
    const [user, setUser] = React.useState(null);

    const redirectUri = makeRedirectUri({
        useProxy: true, // True para desarrollo usando Expo, False en producción
        native: 'mihogar://oauthredirect', // Usa el mismo esquema que está en app.json
    });

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "873446339074-eo4lt70v1fo9121aoog4kfm6bn2ogdfp.apps.googleusercontent.com",
        iosClientId: "873446339074-51beas6eftq2vjc032snf61vm882gcj3.apps.googleusercontent.com",
        androidClientId: "873446339074-ha1l06cuethivhnahu3m7kf22de9hvbm.apps.googleusercontent.com",
        redirectUri: redirectUri,
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            setAccessToken(response.authentication.accessToken);
            fetchUserInfo(response.authentication.accessToken);
        }
    }, [response]);

    async function fetchUserInfo(token) {
        try {
            let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userInfo = await response.json();
            setUser(userInfo);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    const ShowUserInfo = () => {
        return (
            <View>
                <Text>Welcome</Text>
                {user?.picture && <Image source={{ uri: user.picture }} style={{ width: 100, height: 100 }} />}
                <Text>{user?.name}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {user ? <ShowUserInfo /> : <Button title="Login with Google" onPress={() => promptAsync()} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen;
