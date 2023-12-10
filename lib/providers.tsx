'use client';

import { Provider } from 'react-redux';

import { reduxStore } from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(reduxStore);

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={persistor}>{props.children}</PersistGate>
    </Provider>
  );
};
