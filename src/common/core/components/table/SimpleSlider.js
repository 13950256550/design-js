import React from 'react';
import { Carousel } from 'antd';

import styles from './table.less';

class SimpleSlider extends React.PureComponent {
  render() {
    return (
      <Carousel >
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </Carousel>
    );
  }
}

export default SimpleSlider;
