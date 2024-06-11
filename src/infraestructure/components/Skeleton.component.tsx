import { useEffect } from 'react';
import { Animated, DimensionValue, Easing, StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


interface SkeletonProps {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    style?: ViewStyle;
}


export const SkeletonComponent = ({
    width = '100%',
    height = 20,
    borderRadius = 4,
    style,
}: SkeletonProps) => {

    const translateX = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    }, []);

    const translateXInterpolated = translateX.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 200], 
    });


    return (
        <View style={[styles.container, { width, height, borderRadius }, style]}>
            <Animated.View style={{ ...StyleSheet.absoluteFillObject, transform: [{ translateX: translateXInterpolated }] }}>
                <LinearGradient
                    colors={['#e0e0e0', '#f0f0f0', '#e0e0e0']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={StyleSheet.absoluteFillObject}
                />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#e0e0e0',
    },
});
