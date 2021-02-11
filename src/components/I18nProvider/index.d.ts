import * as React from 'react';

export interface I18nProviderProps {
    children: React.ReactNode;
    t: (String) => String
}

declare const I18nProvider: React.FunctionComponent<I18nProviderProps>;
export default I18nProvider;
