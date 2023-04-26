import React, {useCallback, useState} from 'react';
import {FlatList, LayoutChangeEvent, FlatListProps} from 'react-native';
import {Card, CardProps} from './Card';

export interface PhotoListProps<ItemT> extends FlatListProps<ItemT> {
  numColumns?: number;
  photoListWrapperProps?: CardProps;
}

export const PhotoList = <T extends object>({
  numColumns = 4,
  photoListWrapperProps,
  ...props
}: PhotoListProps<T>) => {
  const [columnHeight, setColumnHeight] = useState(0);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const width = e.nativeEvent.layout.width;
      setColumnHeight(width / numColumns);
    },
    [numColumns],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => {
      return {length: columnHeight, offset: columnHeight * index, index};
    },
    [columnHeight],
  );

  return (
    <Card
      {...photoListWrapperProps}
      flex={1}
      alignItems="stretch"
      justifyContent="center">
      <FlatList
        {...props}
        onLayout={onLayout}
        columnWrapperStyle={[undefined, {height: columnHeight}]}
        numColumns={numColumns}
        getItemLayout={getItemLayout}
      />
    </Card>
  );
};
