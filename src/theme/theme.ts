interface Spacing {
  space_2: number;
  space_4: number;
  space_7: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_14: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_36: number;
  space_48: number;
  space_50: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_7: 7,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_14: 14,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
  space_48: 48,
  space_50: 50,
};

interface Color {
  primaryWhiteHex: string;
  primaryWhiteRGBA: string;
  secondaryWhiteRGBA: string;
  tertiaryWhiteRGBA: string;
  quarternaryWhiteRGBA: string;
  primaryLightGreyHex: string;
  primaryBlackHex: string;
  primaryBlackRGBA: string;
  secondaryBlackRGBA: string;
  tertiaryBlackRGBA: string;
  primaryGreenHex: string;
  primaryRedHex: string;
  secondaryGreenHex: string;
  primaryYellowHex: string;
  primaryDarkGrayHex: string;
  // primaryRedHex: string;
  // primaryOrangeHex: string;
  // primaryBlackHex: string;
  // primaryDarkGreyHex: string;
  // secondaryDarkGreyHex: string;
  // primaryGreyHex: string;
  // secondaryGreyHex: string;
  // primaryLightGreyHex: string;
  // secondaryLightGreyHex: string;
  // primaryWhiteHex: string;
  // primaryBlackRGBA: string;
  // secondaryBlackRGBA: string;
}

export const COLORS: Color = {  
  primaryWhiteHex: '#FFFFFF',
  primaryWhiteRGBA: 'rgba(255,255,255,0.4)',
  secondaryWhiteRGBA: 'rgba(255,255,255,0.3)',
  tertiaryWhiteRGBA: 'rgba(255,255,255,0.2)',
  quarternaryWhiteRGBA: 'rgba(255,255,255,0.1)',
  primaryLightGreyHex: '#52555A',
  primaryBlackHex: '#000000',
  primaryBlackRGBA: 'rgba(0,0,0,0.7)',
  secondaryBlackRGBA: 'rgba(0,0,0,0.9)',
  tertiaryBlackRGBA: 'rgba(0,0,0,0.5)',
  primaryGreenHex: '#00A42E',
  primaryRedHex: '#E10000',
  secondaryGreenHex: '#00BA00',
  primaryYellowHex: '#FFC700',
  primaryDarkGrayHex: '#171717',
  // primaryRedHex: '#DC3535',
  // primaryOrangeHex: '#D17842',
  // primaryBlackHex: '#0C0F14',
  // primaryDarkGreyHex: '#141921',
  // secondaryDarkGreyHex: '#21262E',
  // primaryGreyHex: '#252A32',
  // secondaryGreyHex: '#252A32',
  // primaryLightGreyHex: '#52555A',
  // secondaryLightGreyHex: '#AEAEAE',
  // secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
};

interface FontFamily {
  poppins_black: string;
  poppins_bold: string;
  poppins_extrabold: string;
  poppins_extralight: string;
  poppins_light: string;
  poppins_medium: string;
  poppins_regular: string;
  poppins_semibold: string;
  poppins_thin: string;
}

export const FONTFAMILY: FontFamily = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};

interface FontSize {
  size_2: number;
  size_4: number;
  size_8: number;
  size_10: number;
  size_11: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_28: number;
  size_30: number;
  size_34: number;
  size_36: number;
  size_100: number;
}

export const FONTSIZE: FontSize = {
  size_2: 2,
  size_4: 4,
  size_8: 8,
  size_10: 10,
  size_11: 11,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_28: 28,
  size_30: 30,
  size_34: 34,
  size_36: 36,
  size_100: 100,
};

interface BorderRadius {
  radius_4: number;
  radius_5: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
  radius_40: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_5: 5,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
  radius_40: 40,
};
