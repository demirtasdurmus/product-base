import { View } from 'react-native';

import { cn } from '../../lib/utils';

type DotIndicatorProps = {
  totalScreens: number;
  currentIndex: number;
};

const DotIndicator: React.FC<DotIndicatorProps> = ({ totalScreens, currentIndex }) => {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: totalScreens }).map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <View
            key={index}
            className={cn('h-2 rounded-full', isActive ? 'bg-primary w-8' : 'bg-muted w-2')}
          />
        );
      })}
    </View>
  );
};

DotIndicator.displayName = 'DotIndicator';

export { DotIndicator };
