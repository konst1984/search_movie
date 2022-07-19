// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;

const TabsList = (props) => {
  const activePage = (name, key, property) => (
    <TabPane tab={name} key={key}>
      {property}
    </TabPane>
  );

  return (
    <>
      <Tabs defaultActiveKey="1" centered="true" tabBarStyle={{ margin: '0 auto 20px' }}>
        {activePage('Search', '1', props.left)}
        {activePage('Rated', '2', props.right)}
      </Tabs>
    </>
  );
};

TabsList.propTypes = {
  left: PropTypes.object,
  right: PropTypes.object,
};

export default TabsList;
