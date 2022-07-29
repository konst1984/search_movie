import React from 'react';

import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

const TabsList = (props) => {
  const activePage = (name, key, property, disabled = false) => (
    <TabPane tab={name} key={key} disabled={disabled}>
      {property}
    </TabPane>
  );

  return (
    <>
      <Tabs defaultActiveKey="1" centered="true" tabBarStyle={{ margin: '0 auto 20px' }}>
        {activePage('Search', '1', props.left)}
        {activePage('Rated', '2', props.right, props.disabled)}
      </Tabs>
    </>
  );
};

TabsList.propTypes = {
  left: PropTypes.object,
  right: PropTypes.object,
  disabled: PropTypes.bool,
};

export default TabsList;
