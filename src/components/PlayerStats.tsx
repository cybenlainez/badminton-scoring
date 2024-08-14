import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Reports, Presentation, Star, XmarkCircle} from 'iconoir-react-native';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

const PlayerStats = ({data, playerData}: any) => {
  const [isFocusPlayer, setIsFocusPlayer] = useState(false);
  const [playerInitial, setPlayerInitial] = useState('');
  
  const [player, setPlayer] = useState<any>({
    count: 0,
    frontColor: '',
    gradientColor: '',
    loss: 0,
    player: '',
    playerKey: '',
    spacing: 0,
    totalLosses: 0,
    totalWins: 0,
    value: 0,
    win: 0,
    winner: 0,
    winningPercentage: '',
  });

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  // select player
  const getSinglePlayerStats = (name: any) => {
    setPlayer(data.find((item: any) => item.player === name));

    // get first letter of name
    const str = (data.find((item: any) => item.player === name).player);
    const firstLetter = str.length > 0 ? str[0] : undefined;
    setPlayerInitial(firstLetter);
  };

  useEffect(() => {
    getSinglePlayerStats(playerData[0].value);
  }, []);

  return playerData.length > 0 ? (
    <View>
      <View style={styles.nameContainer}>
        {/* <Image
          style={styles.avatar}
          source={require('../assets/images/avatar.png')}
        /> */}
        <LinearGradient
          colors={['#00E1AB', '#086AB0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.avatar}>
          <Text style={styles.avatarText}>{playerInitial}</Text>
        </LinearGradient>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={playerData}
          labelField="label"
          valueField="value"
          placeholder={!isFocusPlayer ? '' : ''}
          searchPlaceholder="search..."
          value={player.player}
          onFocus={() => setIsFocusPlayer(true)}
          onBlur={() => setIsFocusPlayer(false)}
          onChange={(item: {value: React.SetStateAction<null>}) => {
            getSinglePlayerStats(item.value);
            setIsFocusPlayer(false);
          }}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <Text
                style={[
                  styles.detail,
                  {
                    color:
                      player.winningPercentage * 100 >= 50
                        ? COLORS.primaryGreenHex
                        : COLORS.primaryYellowHex,
                  },
                ]}>
                {player.winningPercentage * 100}%
              </Text>
              <Text style={styles.detailTitle}>WIN RATE</Text>
            </View>
            <Reports
              width={20}
              height={20}
              strokeWidth={1}
              color={COLORS.primaryWhiteRGBA}
            />
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.detail}>{player.count}</Text>
              <Text style={styles.detailTitle}>TOTAL GAMES</Text>
            </View>
            <Presentation
              width={20}
              height={20}
              strokeWidth={1}
              color={COLORS.primaryWhiteRGBA}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.detail}>{player.totalWins}</Text>
              <Text style={styles.detailTitle}>WINS</Text>
            </View>
            <Star
              width={20}
              height={20}
              strokeWidth={1}
              color={COLORS.primaryWhiteRGBA}
            />
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.detail}>{player.totalLosses}</Text>
              <Text style={styles.detailTitle}>LOSSES</Text>
            </View>
            <XmarkCircle
              width={20}
              height={20}
              strokeWidth={1}
              color={COLORS.primaryWhiteRGBA}
            />
          </View>
        </View>
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    alignItems: 'center',
    gap: SPACING.space_14,
    marginBottom: SPACING.space_20,
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FONTSIZE.size_100,
    fontWeight: 'bold',
    color: COLORS.primaryWhiteHex,
  },
  detailsContainer: {
    justifyContent: 'space-between',
    gap: SPACING.space_14,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.secondaryWhiteRGBA,
    borderRadius: SPACING.space_15,
    padding: SPACING.space_15,
    width: '48%',
  },
  infoContainer: {
    flexDirection: 'column',
  },
  detailTitle: {
    color: COLORS.primaryWhiteRGBA,
    fontSize: FONTSIZE.size_11,
  },
  detailWinRate: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_34,
    fontWeight: 'bold',
  },
  detail: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_28,
    fontWeight: 'bold',
  },

  // dropdowns
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackRGBA,
  },
  imageStyle: {
    width: 37,
    height: 21,
  },
  dropdown: {
    flex: 1,
    backgroundColor: COLORS.quarternaryWhiteRGBA,
    borderRadius: BORDERRADIUS.radius_5,
    paddingRight: SPACING.space_15,
    paddingLeft: SPACING.space_20,
    fontSize: FONTSIZE.size_14,
    textAlignVertical: 'top',
    height: 50,
    width: 200,
  },
  placeholderStyle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteRGBA,
  },
  selectedTextStyle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default PlayerStats;
