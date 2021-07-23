import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import VaultSelector from '../VaultSelector';

describe('VaultSelector', () => {
  it('renders correctly', () => {
    const tree = render(
      <VaultSelector
        vaults={[
          [
            { icon: 'DIGG-WBTC.png', value: 'wBTC/Digg', labels: ['UNI'] },
            { icon: 'BADGER-WBTC.png', value: 'Badger/wBTC', labels: ['UNI'] },
          ],
          [
            { icon: 'SLP-DIGG-WBTC.png', value: 'Wrapped BTC/Digg', labels: ['SUSHI'] },
            { icon: 'SLP-BADGER-WBTC.png', value: 'Wrapped BTC/Badger', labels: ['SUSHI'] },
            { icon: 'SLP-WBTC-ETH.png', value: 'Wrapped BTC/Wrapped Ether', labels: ['SUSHI'] },
          ],
          [
            { icon: 'UNI-WBTC-DIGG.png', value: 'crvRenWBTC', labels: ['CURVE'] },
            { icon: 'UNI-WBTC-DIGG.png', value: 'renBTC/wBTC/sBTC', labels: ['CURVE'] },
            { icon: 'UNI-WBTC-DIGG.png', value: 'tBTC/sBTCCrv LP', labels: ['CURVE'] },
            { icon: 'UNI-WBTC-DIGG.png', value: 'crvRenWBTC', labels: ['CURVE', 'HARVEST'] },
          ],
        ]}
        onClose={() => null}
        onAllClick={() => null}
        isAllChecked={true}
        onItemClick={() => null}
        isItemChecked={() => true}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
