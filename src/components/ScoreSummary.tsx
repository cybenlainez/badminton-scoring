import React, {useState, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {format} from 'date-fns';
import {ScoreDetails} from '../interfaces/ScoreDetails';
import ScoreTable from './ScoreTable';
import {Plus, Minus} from 'iconoir-react-native';

interface ScoreSummaryProps {
  withHeader: boolean;
  scoreDetails: ScoreDetails[];
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  withHeader,
  scoreDetails,
}) => {
  return scoreDetails !== null ? (
    withHeader ? (
      scoreDetails
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((data: any, index: number) => (
          <ScoreTable key={data.date} defaultVisible={index == 0 ? true : false} showHeader={true} data={data} />
        ))
    ) : (
      <ScoreTable defaultVisible={true} showHeader={false} data={scoreDetails[0]} />
    )
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  
});

export default ScoreSummary;
