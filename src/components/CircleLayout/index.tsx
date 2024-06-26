import styles from './styles.module.scss';
import CircleItem from '../CircleItem';
import { memo } from 'react';

export const CircleLayout = memo(
  ({ items, blockColor }: { items: string[]; blockColor?: string }) => {
    const blockWidth = 30; // Ширина блока

    const numberOfBlocks = items.length; // Количество блоков

    const totalLength = numberOfBlocks * (blockWidth * 2); // Общая длина с промежутками
    const radius = totalLength / (2 * Math.PI); // Половина ширины и высоты .circleContainer

    const circleStyle = {
      width: `${radius * 2}px`,
      height: `${radius * 2}px`,
    };

    return (
      <div className={styles.circleContainer} style={circleStyle}>
        {items.map((item: string, index: number) => (
          <CircleItem
            key={item}
            step={items.length}
            countNumber={index}
            blockColor={blockColor || undefined}
            blockWidth={blockWidth}
            text={item}
            radius={radius}
          />
        ))}
      </div>
    );
  },
);

export default CircleLayout;
