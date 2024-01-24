import React, { useMemo } from 'react';

import BasketballIcon from 'icon/sidebar/BasketballIcon';
import CourthouseIcon from 'icon/sidebar/CourthouseIcon';
import DiagramIcon from 'icon/sidebar/DiagramIcon';
import Element4Icon from 'icon/sidebar/Element4Icon';
import FootballIcon from 'icon/sidebar/FoorballIcon';
import FormulaIcon from 'icon/sidebar/FormulaIcon';
import GameFiIcon from 'icon/sidebar/GameFiIcon';
import MMAIcon from 'icon/sidebar/MMAIcon';
import OtherIcon from 'icon/sidebar/OtherIcon';
import TennisBallIcon from 'icon/sidebar/TennisBallIcon';

interface IProps {
  category: string | undefined;
  color: string;
}

const RenderIConByCategory = ({ category, color }: IProps) => {
  const renderIcon = useMemo(() => {
    if (!category) return <></>;
    switch (category) {
      case 'Football':
        return <FootballIcon color={color} />;
      case 'Baseball':
        return <BasketballIcon color={color} />;
      case 'Tennis':
        return <TennisBallIcon color={color} />;
      case 'Formula 1':
        return <FormulaIcon color={color} />;
      case 'MMA':
        return <MMAIcon color={color} />;
      case 'Coin Price':
        return <DiagramIcon color={color} />;
      case 'Politics':
        return <CourthouseIcon color={color} />;
      case 'Others':
        return <OtherIcon color={color} />;
      case 'GameFi':
        return <GameFiIcon color={color} />;
      default:
        return <Element4Icon color={color} />;
    }
  }, [category]);

  return renderIcon;
};

export default RenderIConByCategory;
