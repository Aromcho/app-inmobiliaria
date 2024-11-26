import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [accessToken, setAccessToken] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  // Generar la URI de redirección
  const redirectUri = makeRedirectUri({
    useProxy: true, // Puedes cambiar a false en producción si necesitas una redirección directa
    native: 'com.aroncho.mihogar:/oauthredirect',
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "226215090375-s20bqe4pqa3a0rbr6ec6fjlpa2naeufh.apps.googleusercontent.com",
    iosClientId: "226215090375-b3lpndut1dlsd27uv6didhe6srjrbolc.apps.googleusercontent.com",
    androidClientId: "226215090375-4b29qg10naqkjsslrgovgibsap0ifd9e.apps.googleusercontent.com",
    redirectUri: redirectUri,
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === 'success') {
        setAccessToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem('@user');
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (e) {
      console.log('Error fetching user info:', e);
    }
  };

  const ShowUserInfo = () => {
    return (
      <View>
        <Text>Welcome</Text>
        {userInfo?.picture && <Image source={{ uri: userInfo.picture }} style={{ width: 100, height: 100 }} />}
        <Text>{userInfo?.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userInfo ? <ShowUserInfo /> : <Button title="Login with Google" onPress={() => promptAsync()} />}
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
