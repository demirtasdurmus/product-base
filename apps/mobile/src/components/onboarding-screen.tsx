import { Image, ImageSourcePropType, useWindowDimensions, View } from 'react-native';
import { H2, P } from './ui/typography';

export type OnboardingScreenData = {
  title: string;
  description: string;
  image: ImageSourcePropType;
};

type OnboardingScreenProps = {
  data: OnboardingScreenData;
  index: number;
};

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ data }) => {
  const { width, height } = useWindowDimensions();
  const imageHeight = Math.min(width * 0.5, height * 0.35);

  return (
    <View className="flex-1 px-6" style={{ width }}>
      <View className="flex-1 justify-center pt-16">
        {/* Image Container */}
        <View className="mb-12 items-center justify-center" style={{ minHeight: imageHeight }}>
          <Image
            source={data.image}
            resizeMode="contain"
            style={{
              width: '100%',
              height: imageHeight,
              maxHeight: imageHeight
            }}
          />
        </View>

        {/* Content */}
        <View className="flex-1 justify-start gap-6 px-2">
          <View>
            <H2 className="text-center">{data.title}</H2>
          </View>

          <View>
            <P className="text-muted-foreground px-2 text-center leading-7">{data.description}</P>
          </View>
        </View>
      </View>
    </View>
  );
};
