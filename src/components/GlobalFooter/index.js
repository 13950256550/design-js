import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default ({ className, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <div className={clsString}>
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </div>
  );
};
