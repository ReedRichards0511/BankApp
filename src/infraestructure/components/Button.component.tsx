import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
    handlePress: () => void
    title: string
    primaryColor: string
    textColor: string
    disabled?: boolean
}

export const ButtonComponent = ({ handlePress, primaryColor, title, textColor, disabled= false }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={handlePress} disabled={disabled} >
            <View style={{
                ...styles.button,
                backgroundColor: primaryColor
            }}>
                <Text style={{
                    ...styles.text,
                    color: textColor
                }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        width: 500,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    }
})