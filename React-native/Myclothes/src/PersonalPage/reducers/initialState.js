/**
 * Created by vjtc0n on 9/22/16.
 */
import {Record} from 'immutable'

const Form = Record({
    searchedMember: null,
    isFetching:false,
    error: null
});

var InitialState = Record({
    form: new Form()
});

export default InitialState