import { bindActionCreators } from 'redux';
import { LIST_NOTIFICATIONS } from './notification.action-types';


export const handleNotifications = (notifications) => {
    return {
        type: LIST_NOTIFICATIONS,
        notifications
    }
};

function mapDispatchToProps(dispatch){

    const actions = {
        handleNotifications: bindActionCreators(handleNotifications, dispatch)
    };

    return { actions };
}

export default mapDispatchToProps;
