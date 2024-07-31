import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps {
    time: boolean
    icon: boolean
    title: string
    subtitle: string
    isProfile: boolean
    isBack: boolean
    isSettings: boolean
}

const Header: React.FC<HeaderProps> = ({time, icon, title, subtitle, isProfile, isBack, isSettings}) => {

    const navigation = useNavigation()

    return (
    <View style={styles.headerContainer}>
        <ImageBackground
            style={styles.itemBackgroundImage}
            source={isProfile ? require('../assets/images/bg-big.png') : require('../assets/images/bg-small.png')}
        >
            <View style={styles.headerControlsContainer}>
                <TouchableOpacity onPress={() => isBack ? navigation.goBack() : navigation.navigate('')}>
                    <Image source={isBack ? require('../assets/images/back.png') : require('../assets/images/lock.png')} style={styles.image} />
                </TouchableOpacity>
                {
                    time
                    ?
                        <Text style={styles.time}>00:00:00</Text>
                    :
                        <></>
                }
                <TouchableOpacity onPress={() => isSettings ? navigation.navigate('Settings') : navigation.navigate('Profile')}>
                    <Image source={isSettings ? require('../assets/images/settings.png') : require('../assets/images/profile.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            {
                isProfile
                ?
                    <View style={styles.profileContainer}>
                        <Image source={require('../assets/images/avatar.png')} />
                        <View>
                            <View style={styles.titleContainer}>
                                <Text style={[styles.headerTitle, { fontSize: time ? FONTSIZE.size_20 : FONTSIZE.size_24 }]}>{title}</Text>
                                <TouchableOpacity onPress={() => {}}>
                                    <Image source={require('../assets/images/pencil.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headerSubtitle}>{subtitle}</Text>
                            <View style={styles.verifyContainer}>
                                <Image source={require('../assets/images/check.png')} />
                                <Text style={styles.verify}>Verified Account</Text>
                            </View>
                        </View>
                    </View>
                :
                    <View style={styles.headerTitleContainer}>
                        <Text style={[styles.headerTitle, { fontSize: time ? FONTSIZE.size_20 : FONTSIZE.size_24 }]}>{title}</Text>
                        <Text style={styles.headerSubtitle}>{subtitle}</Text>
                    </View>
            }
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    itemBackgroundImage: {
        width: '100%',
    },
    headerContainer: {
        // flex: 1,
    },
    headerControlsContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileContainer: {
        paddingLeft: SPACING.space_30,
        paddingRight: SPACING.space_30,
        paddingBottom: SPACING.space_30,
        gap: SPACING.space_15,
        flexDirection: 'row',
    },
    headerTitleContainer: {
        flexDirection: 'column',
        paddingBottom: SPACING.space_20,
        paddingLeft: SPACING.space_30,
        paddingRight: SPACING.space_30,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_10,
    },
    headerTitle: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
        width: 220,
    },
    verifyContainer: {
        flexDirection: 'row',
        gap: SPACING.space_7,
        paddingTop: SPACING.space_7,
    },
    verify: {
        color: COLORS.primaryGreenHex,
        fontSize: FONTSIZE.size_12,
        fontWeight: 'bold',
    },
    image: {
        height: SPACING.space_16,
    },
    time: {
        fontWeight: 'bold',
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryYellowHex,
        backgroundColor: COLORS.tertiaryBlackRGBA,
        paddingTop: SPACING.space_7,
        paddingBottom: SPACING.space_7,
        paddingLeft: SPACING.space_10,
        paddingRight: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_5,
    },
})

export default Header
