import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { getDisplayName } from '../utils/HOC';
import LocalizationStore from './localization-store/localization-store';

function withLanguage(WrappedComponent) {
    class LanguageWrapper extends React.Component {
        render() {
            const i18n = LocalizationStore.i18n;

            return (
                <I18nextProvider i18n={i18n}>
                    <WrappedComponent {...this.props} />
                </I18nextProvider>
            );
        }
    }
    LanguageWrapper.displayName = `WithLanguage(${getDisplayName(WrappedComponent)})`;

    return LanguageWrapper;
}

export default withLanguage;