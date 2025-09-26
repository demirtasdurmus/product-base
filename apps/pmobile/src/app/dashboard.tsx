import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Button } from '../components/button';
import { Card, CardFooter, CardHeader } from '../components/card';
import { Text } from '../components/text';
import { authClient } from '../lib/auth-client';

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        }
      }
    });
  };

  useEffect(() => {
    if (!session && !isPending) {
      router.push('/');
    }
  }, [session, isPending]);

  return (
    <Card className="w-10/12">
      <CardHeader>
        <View className="flex-row items-center gap-2">
          <Avatar alt="user-image">
            <AvatarImage
              source={{
                uri: session?.user?.image || ''
              }}
            />

            <AvatarFallback>
              <Text>{session?.user?.name[0]}</Text>
            </AvatarFallback>
          </Avatar>

          <View>
            <Text className="font-bold">{session?.user?.name}</Text>
            <Text className="text-sm">{session?.user?.email}</Text>
          </View>
        </View>
      </CardHeader>

      <CardFooter className="justify-between">
        <Button variant="default" size="sm" className="flex-row items-center gap-2">
          <Ionicons name="edit" size={16} color="white" />
          <Text>Edit User</Text>
        </Button>

        <Button
          variant="secondary"
          className="flex-row items-center gap-2"
          size="sm"
          onPress={handleSignOut}
        >
          <Ionicons name="logout" size={14} color="black" />
          <Text>Sign Out</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}
