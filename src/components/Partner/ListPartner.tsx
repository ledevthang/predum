import { Box, CardMedia } from '@material-ui/core';
import LeftArrow from 'components/Event/LeftArrow';
import RightArrow from 'components/Event/RightArrow';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { PartnerResponse } from 'types/partner';
import { useStyles } from './styles';
import partnerService from 'services/partner';
import PartnerPrediction from './PartnerPrediction';

const ListPartner = () => {
  const classes = useStyles();
  const [partners, setPartners] = useState<PartnerResponse[]>([]);

  useEffect(() => {
    (async () => {
      const data = await partnerService.GetAllPartners();
      setPartners(data);
    })();
  }, []);

  const onScrollToView = useCallback((address: string) => {
    const element = document.getElementById(address);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Box>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        scrollContainerClassName={classes.wrapperEventScroll}
        wrapperClassName={classes.wrapper}
      >
        {partners.map((o, i) => {
          return (
            <Box
              key={i}
              mr={2}
              mt={1}
              onClick={() => onScrollToView(o.address)}
            >
              <CardMedia className={classes.logo} image={o.logo} />
            </Box>
          );
        })}
      </ScrollMenu>
      {partners.map((o, i) => {
        return <PartnerPrediction key={i} partner={o} />;
      })}
    </Box>
  );
};

export default ListPartner;
