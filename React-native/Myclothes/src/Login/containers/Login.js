/**
 * Created by vjtc0n on 9/12/16.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/login';

import * as LoginActions from '../actions/login';

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(LoginActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);