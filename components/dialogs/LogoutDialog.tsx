import React, { useContext } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { UserContext } from '@/contexts/UserContext';

const screenWidth = Dimensions.get('window').width;

export function LogoutDialog({ alertOpen, onAlertClose }) {
    // const { signOut } = useContext(UserContext);

    return (
        <Modal
            transparent
            visible={alertOpen}
            animationType="fade"
            onRequestClose={onAlertClose}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Are you sure you want to log out?</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onAlertClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.logoutButton}
                            // onPress={signOut}
                        >
                            <Text style={styles.logoutText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000066',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        width: screenWidth * 0.85,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 20,
        textAlign: 'center',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    cancelButton: {
        padding: 10,
    },
    cancelText: {
        fontSize: 14,
        color: '#555',
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#fff5f5',
        borderColor: '#cc0000',
        borderWidth: 1.3,
        borderRadius: 6,
    },
    logoutText: {
        fontSize: 14,
        color: '#cc0000',
        fontWeight: '600',
    },
});
